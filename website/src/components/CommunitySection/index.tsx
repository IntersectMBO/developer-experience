import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import page from '../Landing/styles.module.css';
import Contributors from './Contributors';

const NEW_ISSUE = 'https://github.com/IntersectMBO/developer-experience/issues/new/choose';
const OPEN_ISSUES = 'https://github.com/IntersectMBO/developer-experience/issues';

/**
 * The pulse card that used to fill the right half of this band reported merged
 * PRs, closed issues and open issues as three all-time totals: no link, two
 * clocks in one row, numbers that only ever grow. It was cut.
 *
 * The right column now carries the contributors, the one part of that half that
 * answered a question a reader actually has ("will anyone pick this up?"), and
 * which the strip under the buttons was already carrying. Cutting the card
 * without moving it here left half the band empty.
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

        <div className={styles.grid}>
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
          </div>

          <div className={styles.people}>
            <p className={styles.peopleLabel}>Who picks it up</p>
            <Contributors />
          </div>
        </div>
      </div>
    </section>
  );
}
