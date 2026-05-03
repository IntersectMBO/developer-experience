import React, { useState, useEffect } from 'react';
import styles from './MonthlyPulse.module.css';

export default function MonthlyPulse() {
  const [data, setData] = useState({
    mergedPRs: '-',
    openIssues: '-',
    closedIssues: '-'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPulse() {
      try {
        // Fetching from GitHub Search API to get aggregate counts
        const [prsRes, openIssuesRes, closedIssuesRes] = await Promise.all([
          fetch(`https://api.github.com/search/issues?q=repo:IntersectMBO/developer-experience+type:pr+is:merged`),
          fetch(`https://api.github.com/search/issues?q=repo:IntersectMBO/developer-experience+type:issue+is:open`),
          fetch(`https://api.github.com/search/issues?q=repo:IntersectMBO/developer-experience+type:issue+is:closed`)
        ]);

        const prs = await prsRes.json();
        const openIssues = await openIssuesRes.json();
        const closedIssues = await closedIssuesRes.json();

        setData({
          mergedPRs: prs.total_count !== undefined ? prs.total_count : '-',
          openIssues: openIssues.total_count !== undefined ? openIssues.total_count : '-',
          closedIssues: closedIssues.total_count !== undefined ? closedIssues.total_count : '-'
        });
      } catch (error) {
        console.error('Error fetching GitHub pulse:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPulse();
  }, []);

  return (
    <div className={styles.pulseCard}>
      <div className={styles.pulseHeader}>
        <h3>All-Time Overview</h3>
      </div>
      <p className={styles.pulseDescription}>Recent repository activity</p>
      
      <div className={styles.pulseGrid}>
        <div className={styles.pulseStat}>
          <span className={styles.statValue}>{loading ? '...' : data.mergedPRs}</span>
          <span className={styles.statLabel}>Merged PRs</span>
        </div>
        <div className={styles.pulseStat}>
          <span className={styles.statValue}>{loading ? '...' : data.closedIssues}</span>
          <span className={styles.statLabel}>Closed Issues</span>
        </div>
        <div className={styles.pulseStat}>
          <span className={styles.statValue}>{loading ? '...' : data.openIssues}</span>
          <span className={styles.statLabel}>New Issues</span>
        </div>
      </div>

      <a 
        href="https://github.com/IntersectMBO/developer-experience" 
        target="_blank" 
        rel="noopener noreferrer"
        className={styles.pulseButton}
      >
        Visit the GitHub Repository
      </a>
    </div>
  );
}
