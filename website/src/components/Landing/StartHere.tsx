import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import { quickStarts, quickStartTotalMinutes } from '@site/src/data/landing';

/**
 * The first session as three cards, one per step, in the way docs.logos.co opens with
 * a "Start here" row under its hero.
 *
 * This was a single card in the hero until the hero took the illustration for its
 * second column. Three cards keep the steps scannable at a size where a list would
 * have been a wall of small text, and the step number becomes the card's ordinal.
 */
export default function StartHere(): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeadRow}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionIndex}>01</span>
            <Heading as="h2" className={styles.sectionTitle}>
              Start here
            </Heading>
          </div>
          <p className={styles.startHereNote}>~{quickStartTotalMinutes} min, in order</p>
        </div>

        <ol className={styles.startGrid}>
          {quickStarts.map((item, index) => (
            <li key={item.href}>
              <Link className={styles.startCard} to={item.href}>
                <span className={styles.startTop}>
                  <span className={styles.startIndex}>{index + 1}</span>
                  <span className={styles.startMeta}>{item.meta}</span>
                </span>
                <span className={styles.startTitle}>{item.title}</span>
                <span className={styles.startDetail}>{item.detail}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
