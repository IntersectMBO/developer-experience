import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import { sessions } from '@site/src/data/landing';

export default function Sessions(): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHead}>
          <span className={styles.sectionIndex}>03</span>
          <h2 className={styles.sectionTitle}>Latest from the working group</h2>
          <p className={styles.sectionNote}>
            Notes, code and recordings from the sessions builders show up to.
          </p>
        </div>

        <div className={styles.gridSessions}>
          {sessions.map((session) => (
            <Link key={session.href} className={styles.sessionCard} to={session.href}>
              <span className={styles.sessionNumber}>Session {session.number}</span>
              <h3 className={styles.sessionTitle}>{session.title}</h3>
              <span className={styles.sessionMeta}>
                <span>{session.quarter}</span>
                <span>Session notes</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
