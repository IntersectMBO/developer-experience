# Intersect Developer Experience — Design System Baseline

A shared reference for humans and agents building or modifying the Developer Experience portal. All design decisions should align with `BRAND.md`.

## Design Principles

1. **Clear over clever.** Documentation is the product; ornament should never compete with readability.
2. **Brand-true, not brand-loud.** Use Intersect colors and type with purpose; the site should feel welcoming, informed, and ambitious without shouting.
3. **Consistent rhythm.** Spacing, type scale, and component behavior follow a unified grid and scale.
4. **Accessible by default.** Color contrast, focus states, and readable type sizes are non-negotiable.
5. **No gradients, no blend modes, no transparency tricks.** Solid fills only, per the brand book.

## Color Tokens

### Brand Roles

| Token | Hex | Usage |
| --- | --- | --- |
| `--color-brand-primary` | `#2353FF` | Primary actions, links, active states, key accents |
| `--color-brand-midnight` | `#1D1D1B` | Headings, strong text, dark surfaces |
| `--color-brand-moon` | `#F5F3EB` | Warm backgrounds, cards, subtle fills |
| `--color-brand-white` | `#FFFFFF` | Page background, negative space |

### Accent Roles

| Token | Hex | Usage |
| --- | --- | --- |
| `--color-accent-vanilla` | `#FEC104` | Highlights, callouts, badges |
| `--color-accent-blazing` | `#FF4B11` | Urgent CTAs, warnings, energetic accents |
| `--color-accent-raspberry` | `#F8908F` | Soft emphasis, tags |
| `--color-accent-caramel` | `#FCE4C6` | Warm neutral backgrounds |
| `--color-accent-black` | `#000000` | Maximum contrast, rare |

### Functional Roles

| Token | Light | Dark | Usage |
| --- | --- | --- | --- |
| `--color-text` | `#1D1D1B` | `#F5F3EB` | Body text |
| `--color-text-secondary` | `#4A4A4A` | `#B3C4D4` | Captions, meta text |
| `--color-text-muted` | `#6A6A6A` | `#9A9A9A` | Disabled, placeholders |
| `--color-background` | `#FFFFFF` | `#1D1D1B` | Page background |
| `--color-surface` | `#F5F3EB` | `#2C2B2B` | Cards, sidebars, elevated surfaces |
| `--color-border` | `#E8E8E8` | `#3A3A3A` | Dividers, borders |
| `--color-link` | `#2353FF` | `#4D91FF` | Inline links |
| `--color-link-hover` | `#1D1D1B` | `#8CB8FF` | Inline link hover |

## Typography Tokens

### Font Stack

```
--font-sans: 'Poppins', 'Helvetica Neue', Helvetica, Arial, system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', Consolas, 'Courier New', monospace;
```

### Type Scale

| Token | Size | Line Height | Weight | Usage |
| --- | --- | --- | --- | --- |
| `--text-hero` | 3rem / 48px | 1.15 | 700 | Homepage hero title |
| `--text-h1` | 2.25rem / 36px | 1.2 | 700 | Page titles |
| `--text-h2` | 1.75rem / 28px | 1.25 | 600 | Major sections |
| `--text-h3` | 1.375rem / 22px | 1.3 | 600 | Subsections |
| `--text-h4` | 1.125rem / 18px | 1.4 | 600 | Card titles, small headings |
| `--text-body` | 1rem / 16px | 1.6 | 400 | Body copy |
| `--text-body-sm` | 0.875rem / 14px | 1.5 | 400 | Captions, sidebars |
| `--text-caption` | 0.75rem / 12px | 1.4 | 500 | Labels, meta |

### Typography Rules

- Headlines are sentence case.
- Body weight is regular (`400`) by default.
- Use medium (`500`) or bold (`600`/`700`) for emphasis, not italics.
- Max paragraph width: `720px` for optimal readability.
- Use the Oxford comma.

## Spacing Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `--space-1` | 0.25rem / 4px | Tight inline gaps |
| `--space-2` | 0.5rem / 8px | Small gaps |
| `--space-3` | 0.75rem / 12px | Compact padding |
| `--space-4` | 1rem / 16px | Default padding/gap |
| `--space-5` | 1.5rem / 24px | Section gaps |
| `--space-6` | 2rem / 32px | Larger section gaps |
| `--space-8` | 3rem / 48px | Section padding |
| `--space-10` | 4rem / 64px | Hero / major section padding |
| `--space-12` | 6rem / 96px | Large vertical rhythm |

## Border & Radius Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `--radius-sm` | 4px | Tags, small buttons |
| `--radius-md` | 8px | Inputs, code blocks, cards |
| `--radius-lg` | 12px | Cards, panels |
| `--radius-pill` | 9999px | Pills, badges |
| `--border-width` | 1px | Dividers, card borders |
| `--border-color` | `--color-border` | Standard borders |

## Shadow Tokens

Keep shadows subtle and solid-feeling. No glows or colored shadows.

| Token | Value | Usage |
| --- | --- | --- |
| `--shadow-sm` | `0 1px 2px rgba(29, 29, 27, 0.06)` | Subtle elevation |
| `--shadow-md` | `0 2px 8px rgba(29, 29, 27, 0.08)` | Cards, dropdowns |
| `--shadow-lg` | `0 4px 20px rgba(29, 29, 27, 0.10)` | Modals, popovers |

## Layout Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `--content-max-width` | 720px | Reading column |
| `--container-max-width` | 1200px | Full-page container |
| `--sidebar-width` | 300px | Documentation sidebar |
| `--toc-width` | 240px | Right-hand table of contents |

## Breakpoints

| Name | Width | Behavior |
| --- | --- | --- |
| `sm` | 640px | Stack layouts, hide TOC |
| `md` | 768px | Tablet layouts |
| `lg` | 1024px | Two-column docs |
| `xl` | 1280px | Full layout with TOC |

## Component Primitives

### Button

| Variant | Background | Border | Text | Radius |
| --- | --- | --- | --- | --- |
| Primary | `--color-brand-primary` | none | white | `--radius-pill` |
| Secondary | transparent | `--color-brand-primary` | `--color-brand-primary` | `--radius-pill` |
| Tertiary | transparent | none | `--color-brand-primary` | 0 |

- Padding: `--space-3` `--space-5`
- Font weight: 600
- Hover: darken background or invert secondary fill

### Card

- Background: `--color-surface`
- Border: `--border-width` solid `--color-border`
- Radius: `--radius-lg`
- Padding: `--space-5`
- Shadow: `--shadow-md` on hover

### Input / Code Block

- Radius: `--radius-md`
- Border: `--border-width` solid `--color-border`
- Focus ring: 2px solid `--color-brand-primary`

### Link

- Default: `--color-link`
- Hover: `--color-link-hover`
- Underline on hover only

## Accessibility

- Minimum contrast ratio: 4.5:1 for body text, 3:1 for large text/UI components.
- Focus indicators must be visible and use `--color-brand-primary`.
- Interactive elements must have minimum 44x44px touch targets.
- Do not rely on color alone to convey meaning.

## Implementation Notes

- These tokens should map to CSS custom properties in `website/src/css/custom.css`.
- Docusaurus Infima variables (`--ifm-*`) should be overridden to match these tokens.
- When adding new components, prefer these tokens over arbitrary values.
- For content, follow the voice guidance in `BRAND.md`.
