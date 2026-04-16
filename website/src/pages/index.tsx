import type { ReactNode } from 'react';
import { useState, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <p className={styles.heroDescription}>
            Join the Developer Experience Working Group and connect with developer advocates
            who are enhancing the Cardano ecosystem. Access comprehensive resources, participate
            in bi-weekly meetings, and collaborate with a community-driven initiative focused on
            improving developer tools and processes.
          </p>
          <div className={styles.buttons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/getting-started">
              Join Working Group
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/docs/working-group/">
              Learn About Programs
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

interface GitHubIssue {
  id: number;
  title: string;
  html_url: string;
  number: number;
  user: {
    login: string;
  };
  created_at: string;
  labels: {
    name: string;
    color: string;
  }[];
  pull_request?: any;
}

function GitHubIssues() {
  const [issues, setIssues] = useState<GitHubIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    async function fetchIssues() {
      try {
        const response = await fetch(
          'https://api.github.com/repos/IntersectMBO/developer-experience/issues?state=open&per_page=50'
        );
        if (!response.ok) throw new Error('Failed to fetch issues');
        const data = await response.json();
        // Filter out Pull Requests, as GitHub's /issues endpoint returns both
        const onlyIssues = (data as GitHubIssue[]).filter(item => !item.pull_request);
        setIssues(onlyIssues);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
    fetchIssues();
  }, []);

  const availableLabels = useMemo(() => {
    const labels = new Set(['All']);
    issues.forEach(issue => {
      issue.labels.forEach(label => labels.add(label.name));
    });
    return Array.from(labels).slice(0, 5); // Limit to top 5 labels for UI
  }, [issues]);

  const filteredIssues = useMemo(() => {
    if (filter === 'All') return issues.slice(0, 5);
    return issues.filter(issue =>
      issue.labels.some(l => l.name === filter)
    ).slice(0, 5);
  }, [issues, filter]);

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <span className={styles.loader}></span>
        <p>Loading contributions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorWrapper}>
        <p>Could not load issues. Check your connection.</p>
        <Link className="button button--secondary" href="https://github.com/IntersectMBO/developer-experience/issues">
          Go to GitHub
        </Link>
      </div>
    );
  }


  return (
    <div className={styles.contributionContainer}>
      <Heading as="h3" className={styles.contributionTitle}>
        Start contributing with GitHub issues
      </Heading>

      <div className={styles.issueListWrapper}>
        <div className={styles.dropdownContainer}>
          <button
            className={styles.filtersBtn}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            aria-haspopup="true"
            aria-expanded={isFilterOpen}
          >
            FILTERS
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: isFilterOpen ? 'rotate(180deg)' : 'rotate(0)' }}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          <Link 
            href="https://github.com/IntersectMBO/developer-experience/issues/new/choose"
            className={styles.createIssueBtn}
            target="_blank"
          >
            CREATE ISSUE
          </Link>

          {isFilterOpen && (
            <div className={styles.dropdownMenu}>
              {availableLabels.map(label => (
                <button
                  key={label}
                  className={clsx(styles.dropdownItem, filter === label && styles.dropdownItemActive)}
                  onClick={() => {
                    setFilter(label);
                    setIsFilterOpen(false);
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {filteredIssues.map((issue) => {
          const mainLabel = issue.labels[0];
          const labelColor = mainLabel ? `#${mainLabel.color}` : '#ccc';

          return (
            <Link key={issue.id} href={issue.html_url} className={styles.issueItem} target="_blank">
              <div className={styles.issueMain}>
                <div
                  className={styles.issueDot}
                  style={{ background: labelColor }}
                />
                <span className={styles.issueTitleInspiration}>{issue.title}</span>
              </div>
              <span
                className={styles.issueTag}
                style={{ color: labelColor }}
              >
                {mainLabel?.name || 'issue'}
              </span>
            </Link>
          );
        })}
      </div>

      <div className={styles.contributionFooter}>
        <p className={styles.footerText}>
          Pick up a good first issue and ship your first PR.
        </p>
      </div>
    </div>
  );
}

function CommunitySection() {
  return (
    <section className={styles.communitySection}>
      <div className="container">
        <div className={styles.communityContent}>
          <div className="row">
            <div className="col col--12">
              <Heading as="h2" className={styles.sectionTitle}>
                Have Any Questions or Need Help?
              </Heading>
              <p className={styles.sectionDescription}>
                Go to our GitHub repository and create a blank issue to ask, suggest, or question anything.
                Our developer advocates and community members will be happy to assist you with your
                Cardano development journey.
              </p>
            </div>
          </div>
          <div className="row" style={{ marginTop: '2rem' }}>
            <div className="col col--12">
              <GitHubIssues />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResourcesSection() {
  return (
    <section className={styles.resourcesSection}>
      <div className="container">
        <div className={styles.resourcesHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            Developer Resources
          </Heading>
          <p className={styles.sectionDescription}>
            Access comprehensive documentation, guides, and tools designed to accelerate
            your Cardano development journey.
          </p>
        </div>
        <div className="row">
          <div className="col col--4">
            <div className={styles.resourceCard}>
              <Heading as="h3" className={styles.resourceTitle}>Getting Started</Heading>
              <p className={styles.resourceDescription}>
                Step-by-step guides to begin your Cardano development journey with
                essential tools and setup instructions.
              </p>
              <Link className="button button--outline" to="/docs/getting-started">
                Start Building
              </Link>
            </div>
          </div>
          <div className="col col--4">
            <div className={styles.resourceCard}>
              <Heading as="h3" className={styles.resourceTitle}>How-to Guides</Heading>
              <p className={styles.resourceDescription}>
                Practical tutorials covering smart contracts, DeFi applications, and
                advanced Cardano development techniques.
              </p>
              <Link className="button button--outline" to="/docs/how-to-guide/beginner">
                Learn More
              </Link>
            </div>
          </div>
          <div className="col col--4">
            <div className={styles.resourceCard}>
              <Heading as="h3" className={styles.resourceTitle}>Working Groups</Heading>
              <p className={styles.resourceDescription}>
                Explore our Q1 2025 working group sessions, resources, and community
                initiatives shaping the Cardano ecosystem.
              </p>
              <Link className="button button--outline" to="/docs/working-group/">
                Explore Groups
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GettingInvolvedSection() {
  return (
    <section className={styles.gettingInvolvedSection}>
      <div className="container">
        <div className={styles.gettingInvolvedContent}>
          <div className="row">
            <div className="col col--6">
              <div className={styles.involvedImage}>
                <div className={styles.imagePlaceholder}>
                  <Heading as="h3">Join Intersect MBO</Heading>
                  <p>Member-Driven Organization</p>
                </div>
              </div>
            </div>
            <div className="col col--6">
              <Heading as="h2" className={styles.sectionTitle}>
                Get Involved Today
              </Heading>
              <p className={styles.sectionDescription}>
                Become a member of Intersect MBO and actively participate in shaping
                the future of Cardano. Join working groups, vote on key decisions,
                and contribute to collaborative innovation.
              </p>
              <div className={styles.involvedActions}>
                <Link
                  className="button button--primary button--lg"
                  href="https://intersectmbo.org"
                  target="_blank"
                  rel="noopener noreferrer">
                  Become a Member
                </Link>
                <Link
                  className="button button--secondary button--lg"
                  to="/docs/working-group/">
                  View Q1 2025 Sessions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Join the Developer Experience Working Group at Intersect MBO. Connect with developer advocates, access comprehensive Cardano resources, and participate in community-driven initiatives to enhance the developer ecosystem.">
      <main>
        <HomepageFeatures />
        <CommunitySection />
      </main>
    </Layout>
  );
}
