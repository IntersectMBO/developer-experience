/**
 * Landing page content.
 *
 * Everything the home page renders lives here so a maintainer can change copy or
 * swap a link without touching a component. Links are site-absolute and must
 * resolve: the site builds with onBrokenLinks: 'throw'.
 * */

export type QuickStart = {
  title: string;
  detail: string;
  meta: string;
  href: string;
};

export type Track = {
  index: string;
  /** Where a builder is when this track makes sense, not what the track covers. */
  stage: string;
  title: string;
  blurb: string;
  href: string;
  cta: string;
};

export type Topic = {
  title: string;
  href: string;
  links: { label: string; href: string }[];
};

export type Session = {
  number: string;
  title: string;
  quarter: string;
  href: string;
};

export const hero = {
  eyebrow: 'Cardano developer experience',
  title: 'Build on Cardano. Start where you actually are.',
  subtitle:
    'Five tracks, real guides and the session archive from the Developer Experience group at Intersect.',
  primary: { label: 'Start building', href: '/docs/getting-started/' },
  secondary: { label: 'Browse the session archive', href: '/docs/working-group/' },
};

export const quickStarts: QuickStart[] = [
  {
    title: 'Read a real transaction',
    detail: 'Addresses, inputs and outputs, with the same payloads you will parse in code.',
    meta: '~15 min',
    href: '/docs/how-to-guide/beginner/inputsandoutputs/',
  },
  {
    title: 'Run a local devnet',
    detail: 'Spin up yaci-devkit, submit something, reset it and do it again.',
    meta: '~20 min',
    href: '/docs/how-to-guide/advanced/yaci-devkit/',
  },
  {
    title: 'Watch a payment land on-chain',
    detail: 'A working detector that watches an address and reports confirmations.',
    meta: '~30 min',
    href: '/docs/tutorials/local-cardano-payment-detector/',
  },
];

/**
 * Sum of the per-step estimates, so the card can price the whole session. Derived
 * from `meta` rather than stored twice: adding a step updates the total, and a
 * `meta` that stops carrying a number fails the build instead of silently
 * under-reporting.
 */
export const quickStartTotalMinutes = quickStarts.reduce((total, item) => {
  const minutes = Number(item.meta.match(/\d+/)?.[0]);
  if (!Number.isFinite(minutes)) {
    throw new Error(`quickStarts: "${item.title}" has no duration in meta ("${item.meta}")`);
  }
  return total + minutes;
}, 0);

export const tracks: Track[] = [
  {
    index: '01',
    stage: 'New to Cardano',
    title: 'dApp and smart contracts',
    blurb: 'Payments first, then validators. No Haskell required to start.',
    href: '/docs/how-to-guide/beginner/',
    cta: 'Beginner guides',
  },
  {
    index: '02',
    stage: 'Running a node',
    title: 'Infrastructure and DevOps',
    blurb: 'cardano-api, db-sync and a devnet you can tear down.',
    href: '/docs/how-to-guide/advanced/',
    cta: 'Advanced guides',
  },
  {
    index: '03',
    stage: 'Reading the ledger',
    title: 'Core protocol, Haskell',
    blurb: 'Ledger and consensus, written by people working on it.',
    href: '/docs/how-to-guide/advanced/haskell-core-contributor/',
    cta: 'Contributor guide',
  },
  {
    index: '04',
    stage: 'Contributing in Rust',
    title: 'Core protocol, Rust',
    blurb: 'Pallas and Dolos. There is a Go track beside this one.',
    href: '/docs/how-to-guide/advanced/rust-core-contributor/',
    cta: 'Contributor guide',
  },
  {
    index: '05',
    stage: 'Contributing in Go',
    title: 'Core protocol, Go',
    blurb: 'Dingo and gouroboros, on testnets. The simplest setup of the three.',
    href: '/docs/how-to-guide/advanced/go-core-contributor/',
    cta: 'Contributor guide',
  },
];

export const topics: Topic[] = [
  {
    title: 'Get started',
    href: '/docs/getting-started/',
    links: [
      { label: 'Beginner track', href: '/docs/how-to-guide/beginner/' },
      { label: 'Advanced track', href: '/docs/how-to-guide/advanced/' },
      { label: 'Membership guide', href: '/docs/intersect-membership-guide/' },
    ],
  },
  {
    title: 'Addresses and transactions',
    href: '/docs/how-to-guide/beginner/',
    links: [
      { label: 'Addresses', href: '/docs/how-to-guide/beginner/address/' },
      { label: 'Inputs and outputs', href: '/docs/how-to-guide/beginner/inputsandoutputs/' },
    ],
  },
  {
    title: 'Running a node',
    href: '/docs/how-to-guide/advanced/',
    links: [
      { label: 'cardano-api', href: '/docs/how-to-guide/advanced/cardano-api/' },
      { label: 'cardano-db-sync', href: '/docs/how-to-guide/advanced/cardano-db-sync/' },
      { label: 'yaci-devkit', href: '/docs/how-to-guide/advanced/yaci-devkit/' },
    ],
  },
  {
    title: 'Guided tutorials',
    href: '/docs/category/tutorials/',
    links: [
      {
        label: 'Local payment detector',
        href: '/docs/tutorials/local-cardano-payment-detector/',
      },
    ],
  },
  {
    title: 'Backend integration',
    href: '/docs/category/integration-guides/',
    links: [
      {
        label: 'Blaze and Yaci Store',
        href: '/docs/guides/blaze-yaci-store-integration/',
      },
    ],
  },
  {
    title: 'Contributing to core',
    href: '/docs/how-to-guide/advanced/haskell-core-contributor/',
    links: [
      {
        label: 'Haskell (cardano-node)',
        href: '/docs/how-to-guide/advanced/haskell-core-contributor/',
      },
      { label: 'Rust (Pallas, Dolos)', href: '/docs/how-to-guide/advanced/rust-core-contributor/' },
      { label: 'Go', href: '/docs/how-to-guide/advanced/go-core-contributor/' },
    ],
  },
  {
    title: 'The working group',
    href: '/docs/working-group/',
    links: [
      { label: 'Session archive', href: '/docs/working-group/' },
      { label: 'Repository walkthrough', href: '/docs/working-group/q2-2026/sessions/14-sdk-repo-walkthrough/session-notes/' },
    ],
  },
  {
    title: 'Repositories and help',
    href: '/docs/resources/repositories/',
    links: [
      { label: 'Repositories and tools', href: '/docs/resources/repositories/' },
      { label: 'Community channels', href: '/docs/resources/community/' },
      { label: 'FAQ', href: '/docs/faq/' },
    ],
  },
];

export const sessions: Session[] = [
  {
    number: '22',
    title: 'AI-Ready Cardano Repositories',
    quarter: 'Q4 2026',
    href: '/docs/working-group/q4-2026/sessions/22-ai-ready-cardano-repos/session-notes/',
  },
  {
    number: '21',
    title: 'Building a Production Cardano SDK',
    quarter: 'Q2 2026',
    href: '/docs/working-group/q2-2026/sessions/21-cardano-production-sdk/session-notes/',
  },
  {
    number: '20',
    title: 'One API Call to Understand Cardano',
    quarter: 'Q2 2026',
    href: '/docs/working-group/q2-2026/sessions/20-one-api-call-blockfrost/session-notes/',
  },
];
