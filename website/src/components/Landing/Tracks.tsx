import { useState, type ReactNode } from 'react';
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
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHead}>
          <span className={styles.sectionIndex}>01</span>
          <h2 className={styles.sectionTitle}>Pick a track</h2>
        </div>

        <div className={styles.stack}>
          {tracks.map((track, index) => {
            const isActive = index === active;

            return (
              <div
                key={track.href}
                className={`${styles.panel} ${isActive ? styles.panelActive : ''}`}
              >
                <button
                  type="button"
                  id={`track-tab-${index}`}
                  className={styles.panelTab}
                  onClick={() => setActive(index)}
                  aria-expanded={isActive}
                  aria-controls={`track-panel-${index}`}
                >
                  <span className={styles.tabIndex}>{track.index}</span>
                  {/* Strip shows the track name; the open panel shows its stage. */}
                  <span className={styles.tabStrip}>{track.title}</span>
                  <span className={styles.tabHead}>{track.stage}</span>
                </button>

                <div
                  id={`track-panel-${index}`}
                  role="region"
                  aria-labelledby={`track-tab-${index}`}
                  className={styles.panelBody}
                  hidden={!isActive}
                >
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
