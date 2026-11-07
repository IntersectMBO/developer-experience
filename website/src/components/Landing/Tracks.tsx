import { useState, type CSSProperties, type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import { tracks } from '@site/src/data/landing';

/**
 * Expanding-panel slider: one track open at a time, the rest stand as vertical
 * tabs, the way privy.io/neobanks presents its banking stack. Panels stack into
 * an accordion below 769px, where a rotated label has nowhere to go.
 */
export default function Tracks(): ReactNode {
  const [active, setActive] = useState(0);

  return (
    <section className={`${styles.section} ${styles.bandAlt}`}>
      <div className="container">
        <div className={styles.sectionHead}>
          <span className={styles.sectionIndex}>02</span>
          <h2 className={styles.sectionTitle}>Pathways</h2>
        </div>

        <div className={styles.stack}>
          {tracks.map((track, index) => {
            const isActive = index === active;

            return (
              <div
                key={track.href}
                className={`${styles.panel} ${isActive ? styles.panelActive : ''}`}
                style={{ '--track-accent': `var(--track-${track.accent})` } as CSSProperties}
              >
                <button
                  type="button"
                  id={`track-tab-${index}`}
                  className={styles.panelRail}
                  onClick={() => setActive(index)}
                  aria-expanded={isActive}
                  aria-controls={`track-panel-${index}`}
                >
                  <span className={styles.railLabel}>{track.title}</span>
                  <span className={styles.railPlus} aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M6 1.5v9M1.5 6h9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>

                <div
                  id={`track-panel-${index}`}
                  role="region"
                  aria-labelledby={`track-tab-${index}`}
                  className={styles.panelBody}
                >
                  <p className={styles.panelStage}>{track.stage}</p>
                  <h3 className={styles.panelTitle}>{track.title}</h3>
                  <p className={styles.panelBlurb}>{track.blurb}</p>
                  <Link className={styles.panelCta} to={track.href}>
                    {track.cta}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
