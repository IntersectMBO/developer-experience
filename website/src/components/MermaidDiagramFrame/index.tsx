import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './styles.module.css';

const MIN = 0.35;
const MAX = 2.5;
const STEP = 0.15;

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export interface MermaidDiagramFrameProps {
  children: ReactNode;
  /** Shown on the left of the toolbar */
  hint?: string;
}

/**
 * Wraps a ```mermaid fenced block in MDX. Provides fullscreen, zoom buttons,
 * and Ctrl/Cmd + scroll wheel zoom. Uses CSS `zoom` on the rendered Mermaid
 * container so scrollbars match the scaled diagram (supported in modern browsers).
 */
export default function MermaidDiagramFrame({ children, hint }: MermaidDiagramFrameProps): React.ReactNode {
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const applyZoom = () => {
      const mer = contentRef.current?.querySelector<HTMLElement>('.docusaurus-mermaid-container');
      if (!mer) return;
      const s = mer.style as CSSStyleDeclaration & { zoom?: string };
      s.zoom = String(scale);
    };

    applyZoom();

    const root = contentRef.current;
    if (!root) return;

    const mo = new MutationObserver(applyZoom);
    mo.observe(root, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      const mer = contentRef.current?.querySelector<HTMLElement>('.docusaurus-mermaid-container');
      if (mer) {
        const s = mer.style as CSSStyleDeclaration & { zoom?: string };
        s.zoom = '';
      }
    };
  }, [scale]);

  useEffect(() => {
    const onFs = () => {
      const el = rootRef.current;
      setFullscreen(!!el && document.fullscreenElement === el);
    };
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  const zoomIn = () => setScale((prev) => clamp(prev + STEP, MIN, MAX));
  const zoomOut = () => setScale((prev) => clamp(prev - STEP, MIN, MAX));
  const resetZoom = () => setScale(1);

  const toggleFullscreen = async () => {
    const el = rootRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement) {
        await el.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      /* ignore */
    }
  };

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    const delta = e.deltaY < 0 ? STEP : -STEP;
    setScale((prev) => clamp(prev + delta, MIN, MAX));
  };

  return (
    <div ref={rootRef} className={`${styles.root} ${fullscreen ? styles.fullscreen : ''}`}>
      <div className={styles.toolbar} role="toolbar" aria-label="Diagram zoom and full view">
        {hint ? <span className={styles.hint}>{hint}</span> : null}
        <button type="button" onClick={zoomOut} aria-label="Zoom out">
          Zoom out
        </button>
        <span className={styles.zoomPercent} aria-live="polite">
          {Math.round(scale * 100)}%
        </span>
        <button type="button" onClick={zoomIn} aria-label="Zoom in">
          Zoom in
        </button>
        <button type="button" onClick={resetZoom} aria-label="Reset zoom to one hundred percent">
          Reset
        </button>
        <button type="button" onClick={toggleFullscreen} aria-label={fullscreen ? 'Exit full screen' : 'Full screen diagram'}>
          {fullscreen ? 'Exit full view' : 'Full view'}
        </button>
      </div>
      <div
        className={styles.viewport}
        onWheel={onWheel}
        tabIndex={0}
        role="region"
        aria-label="Pathway diagram. Use Ctrl or Command with scroll wheel to zoom."
      >
        <div ref={contentRef} className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}
