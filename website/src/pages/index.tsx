import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import CommunitySection from '@site/src/components/CommunitySection';
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
