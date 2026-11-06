import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Hero from '@site/src/components/Landing/Hero';
import StartHere from '@site/src/components/Landing/StartHere';
import Tracks from '@site/src/components/Landing/Tracks';
import Library from '@site/src/components/Landing/Library';
import Sessions from '@site/src/components/Landing/Sessions';
import CommunitySection from '@site/src/components/CommunitySection';

export default function Home(): ReactNode {
  return (
    <Layout
      title="Build on Cardano"
      description="Four builder tracks, hands-on guides and the session archive from the Cardano Developer Experience working group at Intersect MBO."
    >
      <main>
        <Hero />
        <StartHere />
        <Tracks />
        <Library />
        <CommunitySection />
        <Sessions />
      </main>
    </Layout>
  );
}
