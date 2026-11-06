import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import ThemedImage from '@theme/ThemedImage';
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
          {/* Two inks of the same drawing. The dark one is the light one with the navy
              body remapped to moon, so the laptop's edges read against #1D1D1B instead
              of disappearing into it at 1.05:1. Same pixel size, so the swap cannot
              shift the layout.

              WebP at 84: 71KB and 76KB, against 320KB and 324KB as PNG, with no visible
              difference at the 512px the hero renders them. No PNG fallback: the page
              already depends on color-mix and container queries. */}
          <ThemedImage
            alt="A laptop showing code brackets, the Developer Experience illustration"
            sources={{
              light: '/img/devex-hero.webp',
              dark: '/img/devex-hero-dark.webp',
            }}
            width={1120}
            height={917}
            /* ThemedImage keeps both inks in the DOM and hides one, so both would be
               fetched. Lazy deferral keeps the hidden one out of the network: the
               visible variant is in the first screen and loads anyway. */
            loading="lazy"
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
