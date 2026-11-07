const fs = require('fs');
const path = require('path');

const REPO = 'IntersectMBO/developer-experience';
const OUTPUT_FILE = path.join(__dirname, '../website/src/data/githubData.json');

// Accounts that must never render as contributors: CI bots and AI coding agents.
// GitHub only labels some of them with type "Bot" — cursoragent reports type
// "User" — so check the login as well as the type.
const AUTOMATION_LOGIN_PATTERNS = [
  /bot/i,
  /dependabot/i,
  /agent/i,
  /copilot/i,
  /claude/i,
  /cursor/i,
  /codex/i,
  /devin/i,
];

const isAutomationAccount = (login) =>
  AUTOMATION_LOGIN_PATTERNS.some((pattern) => pattern.test(login));

// A snapshot older than this gets a loud build warning. It is not a build
// failure on purpose: a transient API or rate-limit failure must not block a
// deploy. Visibility is the fix — the community section renders updatedAt.
const STALE_AFTER_DAYS = 7;

const ageInDays = (isoDate) => {
  const then = new Date(isoDate).getTime();
  if (Number.isNaN(then)) return null;
  return Math.floor((Date.now() - then) / 86400000);
};

async function fetchGitHubData() {
  console.log('Fetching GitHub repository data at build time...');

  const headers = {
    'User-Agent': 'Developer-Experience-Build-Script'
  };

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }

  // Stars and forks, for the repo chip in the navbar. Same rule as everything else here:
  // keep the previous values when a fetch fails, and let the site show the snapshot.
  let repo = { stars: null, forks: null, fullName: REPO, url: `https://github.com/${REPO}` };

  let contributors = [];
  let stats = {
    mergedPRs: '15+',
    openIssues: '5+',
    closedIssues: '20+'
  };
  // Timestamp of the data itself. Advanced only when this run really refreshes
  // it, so a failed fetch cannot make a stale snapshot look fresh.
  let updatedAt = new Date().toISOString();
  // Whether this run replaced the preserved snapshot with fresh API data.
  let contributorsOk = false;
  let statsOk = false;
  let repoOk = false;
  let refreshed = false;

  // Preserve existing data if available
  if (fs.existsSync(OUTPUT_FILE)) {
    try {
      const existing = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf-8'));
      if (existing.contributors && existing.contributors.length > 0) {
        contributors = existing.contributors;
      }
      if (existing.stats) {
        stats = existing.stats;
      }
      if (existing.repo) {
        repo = existing.repo;
      }
      if (existing.updatedAt) {
        updatedAt = existing.updatedAt;
      }
    } catch (e) {
      // Ignore read errors
    }
  }

  try {
    // 1. Fetch Contributors
    const contribRes = await fetch(`https://api.github.com/repos/${REPO}/contributors`, { headers });
    if (contribRes.ok) {
      const data = await contribRes.json();
      if (Array.isArray(data)) {
        contributors = data
          .filter(user => user.type !== 'Bot' && !isAutomationAccount(user.login))
          .slice(0, 15)
          .map(user => ({
            login: user.login,
            avatar_url: user.avatar_url,
            html_url: user.html_url
          }));
        contributorsOk = true;
      }
    } else {
      console.warn(`Contributors API returned ${contribRes.status}`);
    }

    // 2. Fetch Search Stats (Merged PRs, Open Issues, Closed Issues)
    const [prsRes, openIssuesRes, closedIssuesRes] = await Promise.all([
      fetch(`https://api.github.com/search/issues?q=repo:${REPO}+type:pr+is:merged`, { headers }),
      fetch(`https://api.github.com/search/issues?q=repo:${REPO}+type:issue+is:open`, { headers }),
      fetch(`https://api.github.com/search/issues?q=repo:${REPO}+type:issue+is:closed`, { headers })
    ]);

    if (prsRes.ok) {
      const prs = await prsRes.json();
      if (prs.total_count !== undefined) stats.mergedPRs = String(prs.total_count);
    }
    if (openIssuesRes.ok) {
      const openIssues = await openIssuesRes.json();
      if (openIssues.total_count !== undefined) stats.openIssues = String(openIssues.total_count);
    }
    if (closedIssuesRes.ok) {
      const closedIssues = await closedIssuesRes.json();
      if (closedIssues.total_count !== undefined) stats.closedIssues = String(closedIssues.total_count);
    }

    statsOk = prsRes.ok && openIssuesRes.ok && closedIssuesRes.ok;

    // 4. Repo metadata. Unauthenticated calls are allowed and cost one request.
    const repoRes = await fetch(`https://api.github.com/repos/${REPO}`, { headers });
    if (repoRes.ok) {
      const meta = await repoRes.json();
      repo = {
        stars: meta.stargazers_count ?? repo.stars,
        forks: meta.forks_count ?? repo.forks,
        fullName: meta.full_name ?? repo.fullName,
        url: meta.html_url ?? repo.url,
      };
      repoOk = true;
    } else {
      console.warn(`Repo API returned ${repoRes.status}`);
    }
  } catch (error) {
    console.warn('Warning: Error fetching GitHub data at build time, using fallback values:', error.message);
  }

  refreshed = contributorsOk && statsOk && repoOk;
  if (refreshed) {
    updatedAt = new Date().toISOString();
  } else {
    const age = ageInDays(updatedAt);
    console.warn(
      `[github-data] Refresh failed — the site will render the snapshot from ${updatedAt}` +
        (age === null ? '.' : age > 0 ? ` (${age} day(s) old).` : ' (today).')
    );
    if (age !== null && age > STALE_AFTER_DAYS) {
      console.warn(
        `[github-data] That snapshot is past the ${STALE_AFTER_DAYS}-day threshold. ` +
          'The community section shows its date, so the staleness is visible on the site.'
      );
    }
  }

  const payload = {
    repo,
    contributors,
    stats,
    updatedAt,
    // true when the numbers above come from a previous run instead of this one
    stale: !refreshed
  };

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(payload, null, 2), 'utf-8');
  console.log(`GitHub data successfully saved to ${OUTPUT_FILE}`);
}

fetchGitHubData();
