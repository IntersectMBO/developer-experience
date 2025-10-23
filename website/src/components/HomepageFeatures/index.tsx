import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Developer Experience Working Group',
    description: (
      <>
        Join our community-driven initiative led by developer advocates. Participate in 
        bi-weekly meetings, identify developer challenges, and collaborate on solutions 
        to enhance the Cardano Layer 1 developer experience.
      </>
    ),
  },
  {
    title: 'Developer Advocate Program',
    description: (
      <>
        Connect with developer advocates who foster vibrant communities, onboard new 
        developers, maintain documentation, and engage through workshops and mentorship 
        programs within the Cardano ecosystem.
      </>
    ),
  },
  {
    title: 'Member-Driven Organization',
    description: (
      <>
        Become part of Intersect MBO, a member-driven organization at the heart of Cardano. 
        Engage in working groups, vote on key decisions, and help shape the future of 
        the Cardano ecosystem through collaborative innovation.
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.featureContent}>
          <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
          <p className={styles.featureDescription}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresHeader}>
          <Heading as="h2" className={styles.featuresTitle}>
            Join the Developer Experience Initiative
          </Heading>
          <p className={styles.featuresSubtitle}>
            Community-driven programs enhancing Cardano's developer ecosystem
          </p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
