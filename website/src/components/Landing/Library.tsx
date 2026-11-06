import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import { topics } from '@site/src/data/landing';

export default function Library(): ReactNode {
  return (
    <section className={`${styles.section} ${styles.bandDark}`}>
      <div className="container">
        <div className={styles.sectionHead}>
          <span className={styles.sectionIndex}>03</span>
          <h2 className={styles.sectionTitle}>Explore Cardano</h2>
        </div>

        <div className={styles.gridTopic}>
          {topics.map((topic) => (
            <div key={topic.title} className={styles.topic}>
              <Link className={styles.topicTitle} to={topic.href}>
                {topic.title}
              </Link>
              <ul className={styles.topicLinks}>
                {topic.links.map((entry) => (
                  <li key={entry.href}>
                    <Link to={entry.href}>{entry.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
