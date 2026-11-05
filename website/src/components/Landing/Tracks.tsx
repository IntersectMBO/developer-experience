import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import { tracks } from '@site/src/data/landing';

export default function Tracks(): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHead}>
          <span className={styles.sectionIndex}>01</span>
          <h2 className={styles.sectionTitle}>Pick a track</h2>
          <p className={styles.sectionNote}>
            Four paths, each starting from running code rather than a glossary.
          </p>
        </div>

        <div className={styles.grid}>
          {tracks.map((track) => (
            <Link key={track.href} className={styles.card} to={track.href}>
              <span className={styles.cardIndex}>{track.index}</span>
              <h3 className={styles.cardTitle}>{track.title}</h3>
              <p className={styles.cardBlurb}>{track.blurb}</p>
              <span className={styles.cardCta}>{track.cta}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
