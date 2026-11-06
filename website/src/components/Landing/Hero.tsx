import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import styles from './styles.module.css';
import { hero, quickStarts, quickStartTotalMinutes } from '@site/src/data/landing';

export default function Hero(): ReactNode {
  return (
    <section className={styles.hero}>
      <div className={clsx('container', styles.heroGrid)}>
        <div className={styles.copy}>
          <Heading as="h1" className={styles.title}>
            {hero.title}
          </Heading>

          <p className={styles.subtitle}>{hero.subtitle}</p>

          <div className={styles.actions}>
            <Link className={styles.primary} to={hero.primary.href}>
              {hero.primary.label}
            </Link>
            <Link className={styles.secondary} to={hero.secondary.href}>
              {hero.secondary.label}
            </Link>
          </div>

          {/* Three counts of this site used to sit here: tracks, sessions, pages.
              Two of them restated the band directly below and the third measured
              publishing rather than anything a reader gets, so they went. */}
        </div>

        <aside className={styles.quickstart} aria-labelledby="start-here">
          <div className={styles.quickstartHead}>
            <h2 id="start-here" className={styles.quickstartTitle}>
              Start here
            </h2>
            {/* The numerals already say "in order"; what the header can add is the
                cost of the whole session, so it carries the sum of the row estimates. */}
            <span className={styles.quickstartNote}>~{quickStartTotalMinutes} min</span>
          </div>

          <ol className={styles.quickstartList}>
            {quickStarts.map((item, index) => (
              <li key={item.href} className={styles.quickstartItem}>
                <Link className={styles.quickstartLink} to={item.href}>
                  <span className={styles.quickstartIndex}>{index + 1}</span>
                  <span className={styles.quickstartBody}>
                    <span className={styles.quickstartItemTitle}>{item.title}</span>
                    <span className={styles.quickstartDetail}>{item.detail}</span>
                  </span>
                  <span className={styles.quickstartMeta}>{item.meta}</span>
                </Link>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
}
