import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import { useThemeConfig } from '@docusaurus/theme-common';

import styles from './styles.module.css';

/** The Intersect legal pages, in the order intersectmbo.org lists them. */
const LEGAL_LINKS = [
  {
    label: 'Cookie Policy',
    href: 'https://docs.intersectmbo.org/intersect-knowledge-base/legal/policies-and-conditions/intersect-internal-policies/cookie-policy',
  },
  {
    label: 'Privacy Policy',
    href: 'https://docs.intersectmbo.org/intersect-knowledge-base/legal/policies-and-conditions/intersect-internal-policies/privacy-policy',
  },
  {
    label: 'Terms of Use',
    href: 'https://docs.intersectmbo.org/intersect-knowledge-base/legal/policies-and-conditions/intersect-internal-policies/terms-of-use',
  },
];

type FooterLink = { label: string; to?: string; href?: string };
type FooterColumn = { title: string; items: FooterLink[] };

/**
 * Footer in the shape of intersectmbo.org's: the mark and the copyright close the
 * page on the left, the link columns run beside it, and a single rule separates a
 * short bottom line.
 *
 * Swizzled rather than configured because Infima centres a logo above the columns
 * and puts the copyright underneath, which is the arrangement the reference does
 * not use. Links still come from docusaurus.config.ts, so changing them needs no
 * code change.
 */
export default function Footer(): ReactNode {
  const { footer } = useThemeConfig();
  // Not read from siteConfig or navbar.title: the bar's lockup carries the wordmark and
  // the navbar title is now empty, and the site title is the longer "Cardano Developer
  // Experience". The footer draws the mark itself, so it needs the short name.
  const name = 'Developer Experience';
  if (!footer) return null;

  const logo = footer.logo;
  const columns = (footer.links ?? []) as FooterColumn[];

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link className={styles.mark} to="/" aria-label={name}>
              {logo && <img src={logo.src} alt="" width={32} height={32} />}
              <span className={styles.name}>{name}</span>
            </Link>
            <p className={styles.copy}>Copyright © {new Date().getFullYear()} Intersect MBO.</p>
            <p className={styles.copy}>All rights reserved.</p>
            <p className={styles.copy}>Built with Docusaurus.</p>
          </div>

          {columns.map((column) => (
            <div key={column.title} className={styles.column}>
              <p className={styles.heading}>{column.title}</p>
              <ul className={styles.list}>
                {column.items.map((item) => {
                  const external = Boolean(item.href);
                  return (
                    <li key={item.label}>
                      <Link
                        className={styles.link}
                        {...(external
                          ? { href: item.href, target: '_blank', rel: 'noreferrer' }
                          : { to: item.to })}
                      >
                        {item.label}
                        {external && (
                          <span className={styles.arrow} aria-hidden="true">
                            ↗
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.rule} />

        <nav className={styles.legal} aria-label="Legal">
          {LEGAL_LINKS.map((item) => (
            <Link
              key={item.label}
              className={styles.link}
              href={item.href}
              target="_blank"
              rel="noreferrer"
            >
              {item.label}
              <span className={styles.arrow} aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </nav>

      </div>

      {/* Cropped wordmark: a few chars at display size, cut by the footer's own bottom
          edge. It reads as texture rather than content because only the top half of the
          glyphs exists, and it is `aria-hidden` for that reason.

          Outside the container on purpose. Inside it the word was clipped to the 1140
          column and sat centred with blue either side; the mark is meant to run the full
          width of the footer, so it is a child of the footer itself. */}
      <div className={styles.wordmarkWrap} aria-hidden="true">
        <span className={styles.wordmark}>DevEx</span>
      </div>
    </footer>
  );
}
