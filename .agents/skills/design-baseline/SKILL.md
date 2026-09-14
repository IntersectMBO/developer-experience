---
name: design-baseline
description: Use when building or modifying UI components, layouts, styles, or design tokens for the Intersect Developer Experience portal. Enforces spacing, typography, color roles, and component primitives from the project design system.
allowed-tools: Read, Write, Edit, Grep, Bash
---

# Intersect DevEx Design System Baseline

A shared reference for building or modifying the Developer Experience portal UI. All design decisions should align with `brand-baseline`.

## When to Use

- Adding or editing React components in `website/src/`.
- Updating `website/src/css/custom.css` or Docusaurus Infima variables.
- Changing layouts, spacing, type, colors, or shadows.
- Creating new pages or documentation sections.

## Design Principles

1. **Clear over clever.** Documentation is the product; ornament should never compete with readability.
2. **Brand-true, not brand-loud.** Use Intersect colors and type with purpose.
3. **Consistent rhythm.** Spacing, type scale, and component behavior follow a unified grid and scale.
4. **Accessible by default.** Color contrast, focus states, and readable type sizes are non-negotiable.
5. **No gradients, no blend modes, no transparency tricks.** Solid fills only.

## Color Tokens

### Brand Roles

| Token | Hex | Usage |
| --- | --- | --- |
| `--color-brand-primary` | `#2353FF` | Primary actions, links, active states |
| `--color-brand-midnight` | `#1D1D1B` | Headings, strong text, dark surfaces |
| `--color-brand-moon` | `#F5F3EB` | Warm backgrounds, cards, subtle fills |
| `--color-brand-white` | `#FFFFFF` | Page background, negative space |

### Accent Roles

| Token | Hex | Usage |
| --- | --- | --- |
| `--color-accent-vanilla` | `#FEC104` | Highlights, callouts, badges |
| `--color-accent-blazing` | `#FF4B11` | Urgent CTAs, warnings |
| `--color-accent-raspberry` | `#F8908F` | Soft emphasis, tags |
| `--color-accent-caramel` | `#FCE4C6` | Warm neutral backgrounds |
| `--color-accent-black` | `#000000` | Maximum contrast, rare |

### Functional Roles (Light / Dark)

| Token | Light | Dark | Usage |
| --- | --- | --- | --- |
| `--color-text` | `#1D1D1B` | `#F5F3EB` | Body text |
| `--color-text-secondary` | `#4A4A4A` | `#B3C4D4` | Captions, meta |
| `--color-text-muted` | `#6A6A6A` | `#9A9A9A` | Disabled, placeholders |
| `--color-background` | `#FFFFFF` | `#1D1D1B` | Page background |
| `--color-surface` | `#F5F3EB` | `#2C2B2B` | Cards, sidebars |
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
| `--text-hero` | 3rem | 1.15 | 700 | Homepage hero |
| `--text-h1` | 2.25rem | 1.2 | 700 | Page titles |
| `--text-h2` | 1.75rem | 1.25 | 600 | Major sections |
| `--text-h3` | 1.375rem | 1.3 | 600 | Subsections |
| `--text-h4` | 1.125rem | 1.4 | 600 | Card titles |
| `--text-body` | 1rem | 1.6 | 400 | Body copy |
| `--text-body-sm` | 0.875rem | 1.5 | 400 | Captions, sidebars |
| `--text-caption` | 0.75rem | 1.4 | 500 | Labels, meta |

## Spacing Tokens

| Token | Value |
| --- | --- |
| `--space-1` | 0.25rem |
| `--space-2` | 0.5rem |
| `--space-3` | 0.75rem |
| `--space-4` | 1rem |
| `--space-5` | 1.5rem |
| `--space-6` | 2rem |
| `--space-8` | 3rem |
| `--space-10` | 4rem |
| `--space-12` | 6rem |

## Border & Radius Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `--radius-sm` | 4px | Tags, small buttons |
| `--radius-md` | 8px | Inputs, code blocks |
| `--radius-lg` | 12px | Cards, panels |
| `--radius-pill` | 9999px | Pills, badges |
| `--border-width` | 1px | Standard borders |

## Shadow Tokens

| Token | Value |
| --- | --- |
| `--shadow-sm` | `0 1px 2px rgba(29, 29, 27, 0.06)` |
| `--shadow-md` | `0 2px 8px rgba(29, 29, 27, 0.08)` |
| `--shadow-lg` | `0 4px 20px rgba(29, 29, 27, 0.10)` |

## Layout Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `--content-max-width` | 720px | Reading column |
| `--container-max-width` | 1200px | Full-page container |
| `--sidebar-width` | 300px | Doc sidebar |
| `--toc-width` | 240px | Right-hand TOC |

## Breakpoints

| Name | Width |
| --- | --- |
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

## Component Primitives

### Button

| Variant | Background | Border | Text | Radius |
| --- | --- | --- | --- | --- |
| Primary | `--color-brand-primary` | none | white | `--radius-pill` |
| Secondary | transparent | `--color-brand-primary` | `--color-brand-primary` | `--radius-pill` |
| Tertiary | transparent | none | `--color-brand-primary` | 0 |

### Card

- Background: `--color-surface`
- Border: `--border-width` solid `--color-border`
- Radius: `--radius-lg`
- Padding: `--space-5`
- Shadow: `--shadow-md` on hover

### Link

- Default: `--color-link`
- Hover: `--color-link-hover`
- Underline on hover only

## Accessibility

- Minimum contrast: 4.5:1 for body text, 3:1 for large text/UI.
- Focus ring: 2px solid `--color-brand-primary`.
- Touch targets: minimum 44x44px.
- Do not rely on color alone to convey meaning.

## Implementation Notes

- Map these tokens to CSS custom properties in `website/src/css/custom.css`.
- Override Docusaurus Infima variables (`--ifm-*`) to match these tokens.
- Prefer these tokens over arbitrary values in new components.
