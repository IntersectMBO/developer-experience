import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import MonthlyPulse from './MonthlyPulse';

export default function CommunitySection() {
  return (
    <section className={styles.communitySection}>
      <div className="container">
        <div className={styles.communityContent}>
          <div className="row">
            <div className="col col--6">
              <Heading as="h2" className={styles.sectionTitle}>
                Have Any Questions or Need Help?
              </Heading>
              <p className={styles.sectionDescription}>
                Go to our GitHub repository and create a blank issue to ask, suggest, or question anything.
                Our developer advocates and community members will be happy to assist you with your
                Cardano development journey.
              </p>
              <div className={styles.communityStats}>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>GitHub</div>
                  <div className={styles.statLabel}>Issues</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>Community</div>
                  <div className={styles.statLabel}>Support</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>Open</div>
                  <div className={styles.statLabel}>Source</div>
                </div>
              </div>
              <div className={styles.communityActions}>
                <Link
                  className="button button--primary button--orange button--lg"
                  href="https://members.intersectmbo.org/"
                  target="_blank"
                  rel="noopener noreferrer">
                  Join Intersect
                </Link>
                <Link
                  className="button button--secondary button--lg"
                  href="https://github.com/IntersectMBO/developer-experience"
                  target="_blank"
                  rel="noopener noreferrer">
                  Visit GitHub Repository
                </Link>
              </div>
            </div>
            <div className="col col--6">
              <div className={styles.communityImage}>
                <MonthlyPulse />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
