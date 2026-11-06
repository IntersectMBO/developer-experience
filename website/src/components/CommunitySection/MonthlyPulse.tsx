import React from 'react';
import styles from './MonthlyPulse.module.css';
import githubData from '@site/src/data/githubData.json';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

/**
 * Format the snapshot timestamp in UTC from the ISO string.
 * Doing it by hand instead of toLocaleDateString keeps the server-rendered and
 * client-rendered output identical, so the date can never mismatch on hydration.
 */
function formatSnapshotDate(updatedAt?: string): string | null {
  if (!updatedAt) return null;
  const snapshot = new Date(updatedAt);
  if (Number.isNaN(snapshot.getTime())) return null;
  return `${snapshot.getUTCDate()} ${MONTHS[snapshot.getUTCMonth()]} ${snapshot.getUTCFullYear()}`;
}

export default function MonthlyPulse() {
  const stats = {
    mergedPRs: githubData.stats?.mergedPRs || '15+',
    openIssues: githubData.stats?.openIssues || '5+',
    closedIssues: githubData.stats?.closedIssues || '20+'
  };

  const snapshotDate = formatSnapshotDate(githubData.updatedAt);
  // The committed snapshot predates the `stale` field, so read it defensively.
  const isStale = (githubData as { stale?: boolean }).stale === true;

  return (
    <aside className={styles.pulseCard} aria-labelledby="repo-pulse">
      <h3 id="repo-pulse" className={styles.pulseLabel}>
        All-time overview
      </h3>
      <p className={styles.pulseDescription}>Pull requests and issues across the repository.</p>

      <dl className={styles.pulseGrid}>
        <div className={styles.pulseStat}>
          <dt className={styles.statLabel}>Merged PRs</dt>
          <dd className={styles.statValue}>{stats.mergedPRs}</dd>
        </div>
        <div className={styles.pulseStat}>
          <dt className={styles.statLabel}>Closed issues</dt>
          <dd className={styles.statValue}>{stats.closedIssues}</dd>
        </div>
        <div className={styles.pulseStat}>
          <dt className={styles.statLabel}>Open issues</dt>
          <dd className={styles.statValue}>{stats.openIssues}</dd>
        </div>
      </dl>

      {snapshotDate && (
        <p className={styles.dataAge}>
          Data as of {snapshotDate}
          {isStale ? ' — GitHub API unavailable at build time' : ''}
        </p>
      )}
    </aside>
  );
}
