import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function Contributors() {
  const [contributors, setContributors] = useState<any[]>([]);

  useEffect(() => {
    const repo = 'IntersectMBO/developer-experience';
    fetch(`https://api.github.com/repos/${repo}/contributors`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          const validContributors = data.filter((user: any) => 
            user.type !== 'Bot' && !user.login.toLowerCase().includes('dependabot')
          );
          setContributors(validContributors.slice(0, 15)); // Display up to 15 contributors
        }
      })
      .catch(error => console.error('Error fetching contributors:', error));
  }, []);

  if (contributors.length === 0) {
    return null;
  }

  return (
    <div className={styles.contributorsContainer}>
      <div className={styles.contributorsList}>
        {contributors.map((user: any) => (
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
