import type { ReactNode } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './brand-kit.module.css';

const COLORS = [
  { name: 'Genie Blue', hex: '#2353FF', rgb: '35, 83, 255', role: 'Primary brand color' },
  { name: 'Midnight', hex: '#1D1D1B', rgb: '29, 29, 27', role: 'Headings and strong text' },
  { name: 'Moon', hex: '#F5F3EB', rgb: '245, 243, 235', role: 'Warm backgrounds' },
  { name: 'Vanilla Sunset', hex: '#FEC104', rgb: '254, 193, 4', role: 'Accent highlights' },
  { name: 'Blazing Amber', hex: '#FF4B11', rgb: '255, 75, 17', role: 'Energetic accents' },
  { name: 'Raspberry Blush', hex: '#F8908F', rgb: '248, 144, 143', role: 'Soft emphasis' },
  { name: 'Caramel Delight', hex: '#FCE4C6', rgb: '252, 228, 198', role: 'Warm neutral fills' },
  { name: 'Winter Steel', hex: '#B3C4D4', rgb: '179, 196, 212', role: 'Secondary neutral' },
];

const DOWNLOADS = [
  {
    label: 'DevEx navbar icon (PNG)',
    path: '/img/intersect-logo.png',
    filename: 'intersect-navbar-icon.png',
    preview: '/img/intersect-logo.png',
    previewBg: '#1D1D1B',
    previewClass: styles.downloadPreviewSmall,
  },
];

const DOS = [
  'Use Genie Blue as the dominant brand color.',
  'Use Poppins for headings and body copy.',
  'Maintain clear space around the logo.',
  'Apply solid fills only — no gradients or blend modes.',
  'Use sentence case for headings and labels.',
];

const DONTS = [
  'Do not stretch, rotate, or distort the logo.',
  'Do not add new colors outside the defined palettes.',
  'Do not use gradients or transparency effects.',
  'Do not use exclusionary or culturally appropriated language.',
  'Do not capitalize words that are not proper nouns.',
];

function BrandKitHero() {
  return (
    <header className={clsx('hero', styles.hero)}>
      <div className="container">
        <div className={styles.heroContent}>
          <Heading as="h1" className={styles.heroTitle}>
            Brand kit
          </Heading>
          <p className={styles.heroSubtitle}>
            Downloads, colors, typography, and usage guidelines for the Developer Experience portal and Intersect communications.
          </p>
        </div>
      </div>
    </header>
  );
}

function DownloadSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>Logo and downloads</Heading>
        <p className={styles.sectionIntro}>
          The Developer Experience portal uses the Intersect logo in the navbar and favicon. Download the assets you need for presentations, documentation, or partner materials.
        </p>
        <div className={styles.downloadGrid}>
          {DOWNLOADS.map((item) => (
            <a
              key={item.path}
              href={item.path}
              download={item.filename}
              className={styles.downloadCard}>
              <div
                className={clsx(styles.downloadPreview, item.previewClass)}
                style={{ backgroundColor: item.previewBg }}>
                <img src={item.preview} alt={item.label} loading="lazy" />
              </div>
              <div className={styles.downloadMeta}>
                <span className={styles.downloadLabel}>{item.label}</span>
                <span className={styles.downloadHint}>Download</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ColorSection() {
  return (
    <section className={clsx(styles.section, styles.sectionAlt)}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>Color palette</Heading>
        <p className={styles.sectionIntro}>
          These colors come from the Intersect brand book. Genie Blue, Midnight, and Moon should dominate; accent colors highlight details.
        </p>
        <div className={styles.colorGrid}>
          {COLORS.map((color) => (
            <div key={color.hex} className={styles.colorCard}>
              <div
                className={styles.colorSwatch}
                style={{ backgroundColor: color.hex }}
                aria-hidden
              />
              <div className={styles.colorMeta}>
                <strong className={styles.colorName}>{color.name}</strong>
                <code className={styles.colorHex}>{color.hex}</code>
                <span className={styles.colorRgb}>RGB {color.rgb}</span>
                <span className={styles.colorRole}>{color.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TypographySection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>Typography</Heading>
        <p className={styles.sectionIntro}>
          Poppins is the primary typeface for Intersect communications. It is available on Google Fonts and Adobe Fonts.
        </p>
        <div className={styles.typeCard}>
          <p className={styles.typeSample}>Aa</p>
          <div className={styles.typeMeta}>
            <strong>Poppins</strong>
            <span>Headlines: bold, sentence case, leading 1.15</span>
            <span>Body: medium, regular, or light depending on readability</span>
            <span>Fallback: Helvetica or Arial</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function UsageSection() {
  return (
    <section className={clsx(styles.section, styles.sectionAlt)}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>Do's and don'ts</Heading>
        <div className="row">
          <div className="col col--6">
            <div className={styles.usageCard}>
              <Heading as="h3" className={styles.usageTitle}>Do</Heading>
              <ul className={styles.usageList}>
                {DOS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col col--6">
            <div className={clsx(styles.usageCard, styles.usageCardDont)}>
              <Heading as="h3" className={styles.usageTitle}>Don't</Heading>
              <ul className={styles.usageList}>
                {DONTS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function BrandKit(): ReactNode {
  return (
    <Layout
      title="Brand kit"
      description="Download DevEx and Intersect brand assets, colors, typography, and usage guidelines.">
      <main>
        <BrandKitHero />
        <DownloadSection />
        <ColorSection />
        <TypographySection />
        <UsageSection />
      </main>
    </Layout>
  );
}
