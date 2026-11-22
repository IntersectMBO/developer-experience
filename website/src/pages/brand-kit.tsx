import type { ReactNode } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './brand-kit.module.css';

const COLORS = [
  { name: 'Genie Blue', hex: '#2353FF', rgb: '35, 83, 255', role: 'Action: links, buttons, focus' },
  { name: 'Midnight', hex: '#1D1D1B', rgb: '29, 29, 27', role: 'Structure: text and rules' },
  { name: 'Moon', hex: '#F5F3EB', rgb: '245, 243, 235', role: 'Warm band surface' },
  { name: 'Pure White', hex: '#FFFFFF', rgb: '255, 255, 255', role: 'Page surface' },
  { name: 'Shadow', hex: '#2C2B2B', rgb: '44, 43, 43', role: 'Dark band surface' },
  { name: 'Vanilla Sunset', hex: '#FEC104', rgb: '254, 193, 4', role: 'Reserved, no consumer today' },
  { name: 'Blazing Amber', hex: '#FF4B11', rgb: '255, 75, 17', role: 'Live, now. And careful' },
  { name: 'Raspberry Blush', hex: '#F8908F', rgb: '248, 144, 143', role: 'Tint and mark only' },
  { name: 'Caramel Delight', hex: '#FCE4C6', rgb: '252, 228, 198', role: 'Hero surface tint' },
  { name: 'Winter Steel', hex: '#B3C4D4', rgb: '179, 196, 212', role: 'Secondary neutral' },
  { name: 'Twilight', hex: '#001453', rgb: '0, 20, 83', role: 'Secondary ink, rare' },
  { name: 'Rich Black', hex: '#000000', rgb: '0, 0, 0', role: 'Maximum contrast, rare' },
];

const ROLES = [
  {
    job: 'Action',
    where: 'Links, primary button, focus ring',
    light: '#2353FF',
    dark: '#4D91FF',
    why: '5.6:1 on white and 5.04:1 on moon. In dark mode the token moves to #4D91FF (5.47:1 on midnight), because brand blue is only 3.02:1 there.',
  },
  {
    job: 'Structure',
    where: 'Body text, headings, 1px item rules',
    light: '#1D1D1B',
    dark: '#F5F3EB',
    why: 'Midnight is ink on a light surface, moon is ink on a dark one.',
  },
  {
    job: 'Live, now',
    where: 'The Next session chip',
    light: '#FF4B11',
    dark: '#FF4B11',
    why: 'Filled chip with a midnight label, 5.04:1. White on this fill is 3.35:1, so the label stays dark.',
  },
  {
    job: 'Careful',
    where: 'Warning callouts, contributor hover ring',
    light: '#C13A0B',
    dark: '#FF8F6B',
    why: 'Label on #FCE9E1 in light and #38201A in dark. The ring is the undarkened #FF4B11 at 3.02:1 on moon.',
  },
  {
    job: 'Surfaces',
    where: 'Bands, cards, page',
    light: '#FFFFFF',
    dark: '#1D1D1B',
    why: 'White alternates with moon on light (1.11:1), midnight with shadow on dark (1.2:1). A shift, not a second brand.',
  },
  {
    job: 'Chrome',
    where: 'Navbar and footer',
    light: '#2353FF',
    dark: '#2353FF',
    why: 'One blue in both themes, so the page opens and closes on the same surface. Controls on it take literal colours, not theme tokens.',
  },
];

const TRACKS = [
  {
    track: 'dApp and smart contracts',
    hue: 'Genie Blue',
    light: '#2353FF',
    dark: '#4D91FF',
    lightNote: '5.60:1 on white',
    darkNote: '5.47:1 on midnight',
  },
  {
    track: 'Infrastructure and DevOps',
    hue: 'Raspberry, darkened',
    light: '#C2185B',
    dark: '#F8908F',
    lightNote: '5.87:1 on white',
    darkNote: '7.54:1 on midnight',
  },
  {
    track: 'Core protocol, Haskell',
    hue: 'Haskell purple',
    light: '#5D4E8C',
    dark: '#A794DE',
    lightNote: '7.16:1 on white',
    darkNote: '6.38:1 on midnight',
  },
  {
    track: 'Core protocol, Rust',
    hue: 'Rust orange',
    light: '#CE422B',
    dark: '#F0764F',
    lightNote: '4.73:1 on white',
    darkNote: '5.96:1 on midnight',
  },
  {
    track: 'Core protocol, Go',
    hue: 'Go cyan, darkened',
    light: '#0B87AD',
    dark: '#45C4E6',
    lightNote: '4.13:1 on white',
    darkNote: '8.27:1 on midnight',
  },
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
  'Keep blue for anything a reader can act on, and let it be the only action color.',
  'Use Poppins for headings and body copy.',
  'Maintain clear space around the logo.',
  'Fill anything that carries a label solidly. Alpha is for shadows, rings and overlays.',
  'Use sentence case for headings and labels.',
];

const DONTS = [
  'Do not stretch, rotate, or distort the logo.',
  'Do not add new colors outside the defined palettes.',
  'Do not use gradients or blend modes.',
  'Do not put text on a translucent fill, or fade a color to make it a text color.',
  'Do not use Blazing Amber as a call to action, or Vanilla Sunset for decoration.',
  'Do not use exclusionary or culturally appropriated language.',
  'Do not capitalize words that are not proper nouns.',
];

function BrandKitHero() {
  return (
    <header className={clsx('hero', styles.hero)}>
      <div className="container">
        <div className={styles.heroLayout}>
          <div className={styles.heroText}>
            <Heading as="h1" className={styles.heroTitle}>
              Brand kit
            </Heading>
            <p className={styles.heroSubtitle}>
              Downloads, colors, typography, and usage guidelines for the Developer Experience portal and Intersect communications.
            </p>
          </div>
          <div className={styles.heroVisual}>
            <img
              src="/img/OSC-con.png"
              alt="Developer Experience illustration"
              loading="eager"
            />
          </div>
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
          These colors come from the Intersect brand book. Genie Blue, Midnight, and Moon dominate; the accents mark one thing each, and the role table below says which.
        </p>
        <div className={styles.colorGrid}>
          {COLORS.map((color) => (
            <div key={color.name} className={styles.colorCard}>
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

function RolesSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>Color roles</Heading>
        <p className={styles.sectionIntro}>
          The palette says which colors exist. This says what each one is for, with the contrast it clears on the surface it sits on. A color carries at most three meanings; past that it reads as decoration and the meanings cancel out.
        </p>
        <div className={styles.rolesTableWrap}>
          <table className={styles.rolesTable}>
            <thead>
              <tr>
                <th scope="col">Job</th>
                <th scope="col">Where it appears</th>
                <th scope="col">Light</th>
                <th scope="col">Dark</th>
                <th scope="col">Why these values</th>
              </tr>
            </thead>
            <tbody>
              {ROLES.map((role) => (
                <tr key={role.job}>
                  <th scope="row" className={styles.roleJob}>{role.job}</th>
                  <td data-label="Where" className={styles.roleWhat}>{role.where}</td>
                  <td data-label="Light">
                    <span className={styles.roleChip}>
                      <span
                        className={styles.roleSwatch}
                        style={{ backgroundColor: role.light }}
                        aria-hidden
                      />
                      <code className={styles.roleHex}>{role.light}</code>
                    </span>
                  </td>
                  <td data-label="Dark">
                    <span className={styles.roleChip}>
                      <span
                        className={styles.roleSwatch}
                        style={{ backgroundColor: role.dark }}
                        aria-hidden
                      />
                      <code className={styles.roleHex}>{role.dark}</code>
                    </span>
                  </td>
                  <td data-label="Why" className={styles.roleWhy}>{role.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function TrackSection() {
  return (
    <section className={clsx(styles.section, styles.sectionAlt)}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>Track colors</Heading>
        <p className={styles.sectionIntro}>
          A track rail carries one color per track, so five hues sit outside the brand book. Three are the languages' own colors; two are ours. They are marks and washes only, never text.
        </p>
        <div className={styles.trackGrid}>
          {TRACKS.map((track) => (
            <div key={track.track} className={styles.colorCard}>
              <div className={styles.trackSwatches} aria-hidden>
                <span className={styles.trackSwatch} style={{ backgroundColor: track.light }} />
                <span className={styles.trackSwatch} style={{ backgroundColor: track.dark }} />
              </div>
              <div className={styles.colorMeta}>
                <strong className={clsx(styles.colorName, styles.trackName)}>{track.track}</strong>
                <span className={styles.colorRole}>{track.hue}</span>
                <span className={styles.colorRgb}>Light {track.lightNote}</span>
                <span className={styles.colorRgb}>Dark {track.darkNote}</span>
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
        <RolesSection />
        <TrackSection />
        <TypographySection />
        <UsageSection />
      </main>
    </Layout>
  );
}
