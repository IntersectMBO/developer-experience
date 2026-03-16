import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

type FeatureItem = {
  title: string;
  description: ReactNode;
  image: string;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Developer Experience Working Group",
    description: (
      <>
        Join our community-driven initiative led by developer advocates.
        Participate in bi-weekly meetings, identify developer challenges, and
        collaborate on solutions to enhance the Cardano Layer 1 developer
        experience.
      </>
    ),
    image: "/img/OSC-con.png",
    link: "/docs/working-group",
  },
  {
    title: "Developer Advocate Program",
    description: (
      <>
        Connect with developer advocates who foster vibrant communities, onboard
        new developers, maintain documentation, and engage through workshops and
        mentorship programs within the Cardano ecosystem.
      </>
    ),
    image: "/img/DA-icon.png",
    link: "/docs/working-group#developer-advocates",
  },
  {
    title: "Member-Driven Organization",
    description: (
      <>
        Become part of Intersect MBO, a member-driven organization at the heart
        of Cardano. Engage in working groups, vote on key decisions, and help
        shape the future of the Cardano ecosystem through collaborative
        innovation.
      </>
    ),
    image: "/img/IntersectMBO.svg",
    link: "/docs/intersect-membership-guide",
  },
];

function Feature({ title, description, image, link }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <Link className="featureCardLinks" to={link}>
        <div className={styles.featureCard}>
          <div className={styles.featureContent}>
            <div className={styles.featureImageContainer}>
              <img src={image} alt={title} className={styles.featureImage} />
            </div>
            <Heading as="h3" className={styles.featureTitle}>
              {title}
            </Heading>
            <p className={styles.featureDescription}>{description}</p>
          </div>
        </div>
      </Link>
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
