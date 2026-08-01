import React from 'react';
import styles from './MonthlyPulse.module.css';
import githubData from '@site/src/data/githubData.json';

export default function MonthlyPulse() {
  const stats = {
    mergedPRs: githubData.stats?.mergedPRs || '-',
    openIssues: githubData.stats?.openIssues || '-',
    closedIssues: githubData.stats?.closedIssues || '-'
  };

  return (
    <div className={styles.pulseCard}>
      <div className={styles.pulseHeader}>
        <h3>All-Time Overview</h3>
      </div>
      <p className={styles.pulseDescription}>Recent repository activity</p>

      <div className={styles.pulseGrid}>
        <div className={styles.pulseStat}>
          <span className={styles.statValue}>{stats.mergedPRs}</span>
          <span className={styles.statLabel}>Merged PRs</span>
        </div>
        <div className={styles.pulseStat}>
          <span className={styles.statValue}>{stats.closedIssues}</span>
          <span className={styles.statLabel}>Closed Issues</span>
        </div>
        <div className={styles.pulseStat}>
          <span className={styles.statValue}>{stats.openIssues}</span>
          <span className={styles.statLabel}>New Issues</span>
        </div>
      </div>

      <a
        href="https://github.com/IntersectMBO/developer-experience/issues"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.pulseButton}
      >
        Make a PR
      </a>
    </div>
  );
}
