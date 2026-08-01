import React from 'react';
import styles from './styles.module.css';
import githubData from '@site/src/data/githubData.json';

interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
}

export default function Contributors() {
  const contributors: Contributor[] = (githubData.contributors as Contributor[]) || [];

  if (contributors.length === 0) {
    return null;
  }

  return (
    <div className={styles.contributorsContainer}>
      <div className={styles.contributorsList}>
        {contributors.map((user: Contributor) => (
          <a
            key={user.login}
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contributorAvatar}
            title={user.login}
          >
            <img src={user.avatar_url} alt={user.login} />
          </a>
        ))}
      </div>
    </div>
  );
}
