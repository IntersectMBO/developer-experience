#!/usr/bin/env node

/**
 * Generate a changelog between two dates
 * Usage: node scripts/changelog-dates.js --from YYYY-MM-DD --to YYYY-MM-DD
 */

const { execSync } = require('child_process');
const { argv } = require('process');

// Parse command line arguments
function parseArgs() {
    const args = {};
    for (let i = 2; i < argv.length; i++) {
        if (argv[i] === '--from' && argv[i + 1]) {
            args.from = argv[i + 1];
            i++;
        } else if (argv[i] === '--to' && argv[i + 1]) {
            args.to = argv[i + 1];
            i++;
        }
    }
    return args;
}

// Validate date format (YYYY-MM-DD)
function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
}

// Get commits between two dates
function getCommits(fromDate, toDate) {
    try {
        const since = `${fromDate} 00:00:00`;
        const until = `${toDate} 23:59:59`;
        const command = `git log --since="${since}" --until="${until}" --pretty=format:"%h|%s|%an|%ad" --date=short`;
        const output = execSync(command, { encoding: 'utf-8' });
        return output.trim().split('\n').filter(line => line.length > 0);
    } catch (error) {
        return [];
    }
}

// Categorize commit by conventional commit type
function categorizeCommit(message) {
    const types = {
        feat: 'Added',
        fix: 'Fixed',
        docs: 'Documentation',
        style: 'Style',
        refactor: 'Changed',
        perf: 'Performance',
        test: 'Tests',
        chore: 'Chore',
        build: 'Build',
        ci: 'CI'
    };

    for (const [type, category] of Object.entries(types)) {
        if (message.toLowerCase().startsWith(`${type}:`)) {
            return category;
        }
        if (message.toLowerCase().startsWith(`${type}(`)) {
            return category;
        }
    }

    // Check for breaking changes
    if (message.includes('BREAKING CHANGE') || message.includes('!:')) {
        return 'Breaking Changes';
    }

    return 'Other';
}

// Format commits into changelog sections
function formatChangelog(commits, fromDate, toDate) {
    const categorized = {};

    commits.forEach(line => {
        const [hash, message, author, date] = line.split('|');
        const category = categorizeCommit(message);

        if (!categorized[category]) {
            categorized[category] = [];
        }

        // Clean up message (remove type prefix)
        let cleanMessage = message;
        const match = message.match(/^[^:)]+[):]\s*(.+)/);
        if (match) {
            cleanMessage = match[1].trim();
        }

        categorized[category].push({
            hash: hash.substring(0, 7),
            message: cleanMessage,
            author,
            date
        });
    });

    // Build changelog output
    let output = `# Changelog: ${fromDate} to ${toDate}\n\n`;
    output += `Generated changelog for the period between ${fromDate} and ${toDate}.\n\n`;

    const order = [
        'Breaking Changes',
        'Added',
        'Fixed',
        'Changed',
        'Performance',
        'Documentation',
        'Build',
        'CI',
        'Tests',
        'Style',
        'Chore',
        'Other'
    ];

    order.forEach(category => {
        if (categorized[category] && categorized[category].length > 0) {
            output += `## ${category}\n\n`;
            categorized[category].forEach(commit => {
                output += `- ${commit.message} (${commit.hash}) - ${commit.author}\n`;
            });
            output += '\n';
        }
    });

    // Summary
    const total = commits.length;
    output += `---\n\n**Total commits:** ${total}\n`;
    output += `**Period:** ${fromDate} to ${toDate}\n`;

    return output;
}

// Main execution
function main() {
    const args = parseArgs();

    if (!args.from || !args.to) {
        console.error('Usage: node scripts/changelog-dates.js --from YYYY-MM-DD --to YYYY-MM-DD');
        console.error('Example: node scripts/changelog-dates.js --from 2025-01-01 --to 2025-01-31');
        process.exit(1);
    }

    if (!isValidDate(args.from)) {
        console.error(`Invalid date format for --from: ${args.from}`);
        console.error('Expected format: YYYY-MM-DD (e.g., 2025-01-01)');
        process.exit(1);
    }

    if (!isValidDate(args.to)) {
        console.error(`Invalid date format for --to: ${args.to}`);
        console.error('Expected format: YYYY-MM-DD (e.g., 2025-01-31)');
        process.exit(1);
    }

    if (new Date(args.from) > new Date(args.to)) {
        console.error('Error: --from date must be before --to date');
        process.exit(1);
    }

    const commits = getCommits(args.from, args.to);

    if (commits.length === 0) {
        console.log(`No commits found between ${args.from} and ${args.to}`);
        process.exit(0);
    }

    const changelog = formatChangelog(commits, args.from, args.to);
    console.log(changelog);
}

main();

