import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import page from '../Landing/styles.module.css';
import Contributors from './Contributors';

const NEW_ISSUE = 'https://github.com/IntersectMBO/developer-experience/issues/new/choose';
const OPEN_ISSUES = 'https://github.com/IntersectMBO/developer-experience/issues';

/**
 * The pulse card that used to sit to the right of this copy reported merged
 * PRs, closed issues and open issues as three all-time totals. It was cut: the
 * totals only ever grow, two of the three numbers were cumulative while the
 * third was a snapshot of right now, and none of them went anywhere you could
 * click. The contributor strip below answers the same question ("is this thing
 * alive?") with faces, which is a stronger answer than 136.
 */
export default function CommunitySection() {
  return (
    <section className={page.section}>
      <div className="container">
        <div className={page.sectionHead}>
          <span className={page.sectionIndex}>03</span>
          <Heading as="h2" className={page.sectionTitle}>
            Get help and contribute
          </Heading>
        </div>

        <div className={styles.support}>
          <p className={styles.supportCopy}>
            Create an issue in our GitHub repository so that our developer advocates and community
            members assist you.
          </p>

          <div className={styles.actions}>
            <Link className={page.primary} href={NEW_ISSUE}>
              Open an issue
            </Link>
            <Link className={page.secondary} href={OPEN_ISSUES}>
              Browse open issues
            </Link>
          </div>

          <Contributors />
        </div>
      </div>
    </section>
  );
}
