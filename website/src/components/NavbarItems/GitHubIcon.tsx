import type {ReactNode} from 'react';
import githubData from '@site/src/data/githubData.json';

type RepoMeta = {stars: number | null; forks: number | null};

/**
 * The GitHub mark as a bar item, with the repository's stars and forks beside it.
 *
 * The counts come from src/data/githubData.json, written by scripts/fetch-github-data.js
 * during the prebuild, so the bar reads a build-time snapshot and the page makes no
 * request to the GitHub API. A missing count renders nothing rather than a zero: a build
 * that has never fetched should look unfinished, not like a repository nobody starred.
 *
 * The octocat is the CC0 path from simple-icons, inlined so the bar adds no request and
 * `currentColor` drives it. It inherits the bar's link colour (white, 5.6:1) rather than
 * the lockup's moon, because it sits among the links, not beside the mark.
 */
const repo = (githubData as {repo?: RepoMeta}).repo;

const compact = (value: number): string =>
  value >= 1000 ? `${(value / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(value);

export default function GitHubIconNavbarItem({
  href,
  label = 'GitHub',
}: {
  href: string;
  label?: string;
}): ReactNode {
  const stars = repo?.stars ?? null;
  const forks = repo?.forks ?? null;

  const counted =
    stars === null || forks === null ? label : `${label}, ${stars} stars and ${forks} forks`;

  return (
    <a
      className="navbar__item navbar__link repoChip"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${counted}, opens in a new tab`}
      title={`${counted}, opens in a new tab`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>

      {/* Shown only in the drawer, where an icon and two numbers with nothing beside them
          reads as debris. Hidden in the bar, which already has the octocat in a row of
          icons. */}
      <span className="repoChip__label">GitHub</span>

      {stars !== null && (
        <span className="repoChip__count">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
            <path d="M7 1.3l1.7 3.5 3.8.5-2.75 2.7.65 3.8L7 9.9l-3.4 1.9.65-3.8L1.5 5.3l3.8-.5z" />
          </svg>
          {compact(stars)}
        </span>
      )}

      {forks !== null && (
        <span className="repoChip__count">
          <svg
            width="12"
            height="12"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="7" cy="2.7" r="1.6" />
            <circle cx="3.3" cy="11.3" r="1.6" />
            <circle cx="10.7" cy="11.3" r="1.6" />
            <path d="M7 4.3v2.5M3.3 9.7V7.6a1 1 0 011-1h5.4a1 1 0 011 1v2.1" />
          </svg>
          {compact(forks)}
        </span>
      )}
    </a>
  );
}
