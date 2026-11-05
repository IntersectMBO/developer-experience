import Heading from '@theme/Heading';
import styles from './styles.module.css';
import MonthlyPulse from './MonthlyPulse';
import Contributors from './Contributors';

export default function CommunitySection() {
  return (
    <section className={styles.communitySection}>
      <div className="container">
        <div className={styles.communityContent}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionIndex}>04</span>
            <Heading as="h2" className={styles.sectionTitle}>
              Get help and contribute
            </Heading>
            <p className={styles.sectionNote}>
              Open an issue and a developer advocate picks it up.
            </p>
          </div>

          <div className="row">
            <div className="col col--6">
              <p className={styles.sectionDescription}>
                Create an issue in our GitHub repository so that our developer advocates and community
                members assist you.
              </p>

              <Contributors />
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
