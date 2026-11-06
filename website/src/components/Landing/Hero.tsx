import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

import clsx from 'clsx';
import styles from './styles.module.css';
import { hero } from '@site/src/data/landing';

/**
 * Media on the left, copy on the right, after the shape of docs.logos.co: the
 * illustration carries one column, and the other is a short stack of heading, one
 * line of support and the action.
 *
 * The three-step start-here card that used to sit in this column is now its own band
 * below (StartHere.tsx). It could not stay here: the media takes the second column,
 * and a card beside a card would have made the hero three things deep.
 */
export default function Hero(): ReactNode {
  return (
    <section className={styles.hero}>
      <div className={clsx('container', styles.heroGrid)}>
        <div className={styles.heroMedia}>
          {/* One ink, because the hero surface is one colour in both themes. WebP at
              84 keeps it at 72KB; it is the first thing on the page, so eager. */}
          <img
            src="/img/devex-hero.webp"
            alt="A laptop showing code brackets, the Developer Experience illustration"
            width={1120}
            height={917}
            loading="eager"
          />
        </div>

        <div className={styles.copy}>
          <Heading as="h1" className={styles.title}>
            {hero.title}
          </Heading>

          <p className={styles.subtitle}>{hero.subtitle}</p>

          <div className={styles.actions}>
            <Link className={styles.primary} to={hero.primary.href}>
              {hero.primary.label}
            </Link>
            <Link className={styles.textLink} to={hero.secondary.href}>
              {hero.secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
