import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import MonthlyPulse from './MonthlyPulse';
import Contributors from './Contributors';

export default function CommunitySection() {
  return (
    <section className={styles.communitySection}>
      <div className="container">
        <div className={styles.communityContent}>
          <div className="row">
            <div className="col col--6">
              <Heading as="h2" className={styles.sectionTitle}>
                Ask Questions or Suggest Improvements
              </Heading>
              <p className={styles.sectionDescription}>
                Create an issue in our GitHub repository so that our developer advocates and community members assist you.
              </p>

              <Contributors />

              <div className={styles.communityActions}>
                <Link
                  className={styles.joinButton}
                  href="https://members.intersectmbo.org/"
                  target="_blank"
                  rel="noopener noreferrer">
                  Join Intersect
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
