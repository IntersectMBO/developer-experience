import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import sessionData from '@site/src/data/sessions.json';

const ARCHIVE_HREF = '/docs/working-group/';
const VISIBLE = 12;

type Session = { number: string; title: string; quarter: string; href: string };

/**
 * Latest sessions, as a horizontal track against the real archive.
 *
 * The list is generated from docs/working-group at build time (scripts/
 * generate-sessions.js) rather than curated here, so the home page cannot fall
 * behind the archive or point at a renamed session.
 *
 * Native horizontal scrolling with scroll snapping does the sliding: no carousel
 * library, no auto-advance, no entrance animation, which keeps the motion policy
 * (markup ships its final state) intact. The arrows are additive for a mouse
 * without a horizontal wheel, and they go away when everything already fits.
 */
export default function Sessions(): ReactNode {
  const sessions = (sessionData.sessions as Session[]).slice(0, VISIBLE);
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    sync();
    track.addEventListener('scroll', sync, { passive: true });
    const observer = new ResizeObserver(sync);
    observer.observe(track);
    return () => {
      track.removeEventListener('scroll', sync);
      observer.disconnect();
    };
  }, [sync]);

  const step = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('li');
    const gap = parseFloat(getComputedStyle(track).columnGap || '0');
    const distance = card ? card.getBoundingClientRect().width + gap : track.clientWidth;
    track.scrollBy({ left: direction * distance, behavior: 'smooth' });
  };

  return (
    <section className={`${styles.section} ${styles.bandDark}`}>
      <div className="container">
        <div className={styles.sectionHeadRow}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionIndex}>05</span>
            <h2 className={styles.sectionTitle}>Latest Updates</h2>
          </div>

          <div className={styles.headActions}>
            <Link className={styles.textLink} to={ARCHIVE_HREF}>
              All {sessionData.total} sessions
            </Link>
            <div className={styles.arrows}>
              <button
                type="button"
                className={styles.arrow}
                onClick={() => step(-1)}
                disabled={!canPrev}
                aria-label="Earlier sessions"
              >
                ←
              </button>
              <button
                type="button"
                className={styles.arrow}
                onClick={() => step(1)}
                disabled={!canNext}
                aria-label="Later sessions"
              >
                →
              </button>
            </div>
          </div>
        </div>

        <ul
          className={styles.track}
          ref={trackRef}
          tabIndex={0}
          aria-label="Session archive, most recent first"
        >
          {sessions.map((session) => (
            <li key={session.href} className={styles.trackItem}>
              <Link className={styles.sessionCard} to={session.href}>
                <span className={styles.sessionMeta}>
                  <span className={styles.sessionNumber}>Session {session.number}</span>
                  <span>{session.quarter}</span>
                </span>
                <h3 className={styles.sessionTitle}>{session.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
