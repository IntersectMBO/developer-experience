import clsx from 'clsx';
import styles from './styles.module.css';
import githubData from '@site/src/data/githubData.json';

interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
}

const GRAPH_URL = 'https://github.com/IntersectMBO/developer-experience/graphs/contributors';

/** Avatars shown before the rest collapse into a count, so the strip stays one row. */
const VISIBLE_LIMIT = 8;

export default function Contributors() {
  const contributors: Contributor[] = (githubData.contributors as Contributor[]) || [];

  if (contributors.length === 0) {
    return (
      <div className={styles.contributors}>
        <p className={styles.contributorsNote}>
          View our contributors on{' '}
          <a href={GRAPH_URL} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          .
        </p>
      </div>
    );
  }

  const visible = contributors.slice(0, VISIBLE_LIMIT);
  const hidden = contributors.length - visible.length;

  return (
    <div className={styles.contributors}>
      <div className={styles.contributorsList}>
        {visible.map((user) => (
          <a
            key={user.login}
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contributorAvatar}
            title={user.login}
          >
            <img src={user.avatar_url} alt={user.login} loading="lazy" />
          </a>
        ))}

        {hidden > 0 && (
          <a
            href={GRAPH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(styles.contributorAvatar, styles.contributorMore)}
            title={`All ${contributors.length} contributors`}
          >
            +{hidden}
          </a>
        )}
      </div>

      <p className={styles.contributorsNote}>
        {contributors.length} contributors.{' '}
        <a href={GRAPH_URL} target="_blank" rel="noopener noreferrer">
          See the full graph on GitHub
        </a>
        .
      </p>
    </div>
  );
}
