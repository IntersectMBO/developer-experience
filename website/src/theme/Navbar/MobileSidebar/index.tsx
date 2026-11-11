import type {ReactNode} from 'react';
import {useEffect, useRef} from 'react';
import {createPortal} from 'react-dom';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useColorMode} from '@docusaurus/theme-common';
import {useLockBodyScroll, useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import githubData from '@site/src/data/githubData.json';
import {tracks, topics} from '@site/src/data/landing';
import {switchTheme} from '@site/src/components/NavbarItems/themeSwitch';
import styles from './styles.module.css';

/**
 * The phone menu, as a sheet rather than a drawer.
 *
 * Docusaurus's drawer is 83vw of panel with four small rows and two carets: the five paths
 * and the whole library sit behind disclosure triangles that a thumb has to aim at. This
 * sheet is the page continued: full width, the search field at the top, the paths and every
 * library topic laid out inline under their own labels, and GitHub and theme as the last two
 * rows. One scroll, nothing hidden behind a caret.
 *
 * It is a replacement for `@theme/Navbar/MobileSidebar`, so the hamburger, the body scroll
 * lock and the `shown` state all still come from Docusaurus; only the markup is ours.
 */
export default function NavbarMobileSidebar(): ReactNode {
  const {shouldRender, shown, toggle} = useNavbarMobileSidebar();
  const {colorModeChoice, setColorMode} = useColorMode();
  const sheetRef = useRef<HTMLDivElement>(null);
  // Every hook runs before the early return below: a hook after a conditional return changes
  // the hook count between renders, which is React error #310 and a crashed page.
  // Two lockups: the white one belongs on blue, the ink one on the sheet's own surface.
  // Which is visible is decided in CSS by theme, so no JS branch and no flash.
  const lockup = useBaseUrl('/img/devex-logo-lockup.png');
  const lockupInk = useBaseUrl('/img/devex-logo-lockup-ink.png');

  useLockBodyScroll(shown);

  useEffect(() => {
    if (!shown) return undefined;
    // Focus the sheet itself, not the close button: focusing a control on open draws its
    // focus ring immediately, which reads as a selection rather than a dialog. The sheet is
    // tabbable from here, so the first Tab lands on close.
    sheetRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') toggle();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [shown, toggle]);

  if (!shouldRender || typeof document === 'undefined') {
    return null;
  }

  const repo = (githubData as {repo?: {stars: number | null; forks: number | null; url: string}}).repo;
  const mode = colorModeChoice === 'dark' ? 'Dark' : 'Light';

  // The field lives in the bar, so the sheet hands over rather than growing a second one: it
  // closes, and the bar's search takes the bar with the keyboard already up.
  const openSearch = () => {
    toggle();
    requestAnimationFrame(() => {
      const input = document.querySelector<HTMLInputElement>('.navbar__search-input');
      input?.focus({preventScroll: true});
    });
  };

  return createPortal(
    <div
      ref={sheetRef}
      tabIndex={-1}
      className={`${styles.sheet} ${shown ? styles.open : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <div className={styles.header}>
        <img className={`${styles.lockup} ${styles.lockupOnLight}`} src={lockupInk} alt="Developer Experience" />
        <img className={`${styles.lockup} ${styles.lockupOnDark}`} src={lockup} alt="" aria-hidden="true" />
        <button
          type="button"
          className={styles.close}
          onClick={() => toggle()}
          aria-label="Close menu"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            <path d="M4 4l10 10M14 4L4 14" />
          </svg>
        </button>
      </div>

      <button type="button" className={styles.search} onClick={openSearch}>
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <circle cx="7" cy="7" r="4.5" />
          <path d="M10.6 10.6 14 14" />
        </svg>
        Search
      </button>

      <nav className={styles.body} aria-label="Site">
        <p className={styles.label}>Paths</p>
        {tracks.map((track) => (
          <Link key={track.title} className={styles.row} to={track.href} onClick={toggle}>
            <span>{track.title}</span>
            <span className={styles.aside}>{track.stage}</span>
          </Link>
        ))}

        <p className={styles.label}>Explore Cardano</p>
        {topics.map((topic) => (
          <div key={topic.title}>
            <Link className={styles.topic} to={topic.href} onClick={toggle}>
              {topic.title}
            </Link>
            {topic.links.map((link) => (
              <Link key={link.label} className={styles.subRow} to={link.href} onClick={toggle}>
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className={styles.footer}>
        {/* The sessions control left the bar below 480 so the lockup could be centred and
            large. This is where it lives instead, beside GitHub. */}
        <Link className={styles.row} to="/docs/working-group/" onClick={toggle}>
          <span className={styles.withIcon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
              <rect x="3" y="5" width="18" height="16" rx="2.5" />
              <path d="M8 3v4M16 3v4M3 10h18" />
            </svg>
            DevEx Sessions
          </span>
        </Link>

        <a
          className={styles.row}
          href={repo?.url ?? 'https://github.com/IntersectMBO/developer-experience'}
          target="_blank"
          rel="noreferrer"
        >
          <span className={styles.withIcon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            GitHub
          </span>
          {repo?.stars !== null && repo?.stars !== undefined && (
            <span className={styles.aside}>
              ★ {repo.stars} · ⑂ {repo.forks}
            </span>
          )}
        </a>

        <button
          type="button"
          className={styles.row}
          onClick={() => switchTheme(colorModeChoice === 'dark' ? 'light' : 'dark', setColorMode)}
        >
          <span className={styles.withIcon}>
            {colorModeChoice === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
              </svg>
            )}
            Theme
          </span>
          <span className={styles.aside}>{mode}</span>
        </button>
      </div>
    </div>,
    document.body,
  );
}
