const fs = require('fs');
const path = require('path');

const REPO = 'IntersectMBO/developer-experience';
const OUTPUT_FILE = path.join(__dirname, '../website/src/data/githubData.json');

async function fetchGitHubData() {
  console.log('Fetching GitHub repository data at build time...');

  const headers = {
    'User-Agent': 'Developer-Experience-Build-Script'
  };

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }

  let contributors = [];
  let stats = {
    mergedPRs: '15+',
    openIssues: '5+',
    closedIssues: '20+'
  };

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
          .filter(user => user.type !== 'Bot' && !user.login.toLowerCase().includes('dependabot'))
          .slice(0, 15)
          .map(user => ({
            login: user.login,
            avatar_url: user.avatar_url,
            html_url: user.html_url
          }));
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
  } catch (error) {
    console.warn('Warning: Error fetching GitHub data at build time, using fallback values:', error.message);
  }

  const payload = {
    contributors,
    stats,
    updatedAt: new Date().toISOString()
  };

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(payload, null, 2), 'utf-8');
  console.log(`GitHub data successfully saved to ${OUTPUT_FILE}`);
}

fetchGitHubData();
