import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useThemeConfig } from '@docusaurus/theme-common';

import styles from './styles.module.css';

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
  const { siteConfig } = useDocusaurusContext();
  const { footer, navbar } = useThemeConfig();
  // The navbar shortens the site title; the footer has to say the same thing.
  const name = (navbar as { title?: string }).title ?? siteConfig.title;
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

        <div className={styles.bottom}>
          <p className={styles.copy}>Built with Docusaurus.</p>
          <Link
            className={styles.link}
            href="https://github.com/IntersectMBO/developer-experience"
            target="_blank"
            rel="noreferrer"
          >
            Edit this site on GitHub
            <span className={styles.arrow} aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
