---
name: brand-baseline
description: Use when writing or reviewing content, copy, or visuals for the Intersect Developer Experience project. Ensures output aligns with the Intersect brand voice, visual style, color palette, typography, and restrictions.
allowed-tools: Read, Write, Edit, Grep, Bash
---

# Intersect Brand Baseline

Ensure all content and visuals for the Developer Experience project follow the Intersect brand book.

## When to Use

- Writing or editing docs, blog posts, UI copy, or marketing content.
- Reviewing copy for brand voice compliance.
- Choosing colors, typography, or visual treatments for components.
- Creating illustrations, icons, or promotional assets.

## Brand Positioning

Intersect is a member-based organization orchestrating Cardano's maintenance and development, and strengthening its decentralization.

We bring members together behind a shared vision: a resilient, secure, transparent, and innovative Cardano ecosystem that puts members in the driving seat of Cardano's future.

## Brand Characteristics

All output should feel:

- **Welcoming** — approachable, friendly, compassionate.
- **Inclusive** — mindful, supportive, never exclusionary.
- **Informed** — confident, clear, generous with knowledge.
- **Ambitious** — energetic and enthusiastic about breaking new ground.

## Tone of Voice Rules

- Use **US English** and **AP style** for global communications.
- Use **contractions** where possible; we are welcoming, not overly formal.
- Use the **Oxford comma** to avoid ambiguity.
- Do **not** capitalize anything that is not a proper noun.
- Keep headings and labels in **sentence case**.
- Never use exclusionary, culturally appropriated, ableist, or misgendering language.

## Preferred Language

Use words that reinforce unity, collaboration, and intersection:

- United, Unity, Collaboration, Intersection, Inclusivity
- Community, Diversity, Togetherness, Partnership, Alliance
- Cooperation, Nexus, Joint effort, Teamwork, In concert
- Synthesis, Sharing, Participation

## Color Palette

### Primary (dominant)

| Name | Hex | RGB |
|---|---|---|
| Genie Blue | `#2353FF` | 35-83-255 |
| Midnight | `#1D1D1B` | 29-29-27 |
| Moon | `#F5F3EB` | 245-243-235 |

### Accent palette

| Name | Hex |
|---|---|
| Vanilla Sunset | `#FEC104` |
| Blazing Amber | `#FF4B11` |
| Raspberry Blush | `#F8908F` |
| Caramel Delight | `#FCE4C6` |
| Rich Black | `#000000` |

### Secondary (minimal)

| Name | Hex |
|---|---|
| Shadow | `#2C2B2B` |
| Twilight | `#001453` |
| Winter Steel | `#B3C4D4` |
| Pure White | `#FFFFFF` |

## Colour roles

The palette above says which colours exist. This says what each one is for, so a new component can pick the right one without reverse-engineering the stylesheet.

A colour carries at most three meanings. Past that it reads as decoration and the meanings cancel out. A new meaning is a change to this table, not a decision made in one component.

| Job | Colour | Light | Dark | Why these values |
|---|---|---|---|---|
| Action: links, primary button, focus ring | Genie Blue | `#2353FF` | `#4D91FF` | 5.6:1 on white and 5.04:1 on moon, so it is legible either way. In dark mode the token moves to `#4D91FF` (5.47:1 on midnight) because brand blue is only 3.02:1 there. |
| Structure: body text, headings, item rules, 1px card borders | Midnight | `#1D1D1B` | `#F5F3EB` | Midnight is ink on a light surface, moon is ink on a dark one. |
| Live, now: the "Next session" chip | Blazing Amber | `#FF4B11` fill with midnight label | same | 5.04:1 with a midnight label, which is the only pairing that clears on this fill: white on blazing is 3.35:1. The chip is filled and never outlined, because the badge is a now-state rather than a highlight. |
| Careful: warning callouts, contributor hover ring | Blazing Amber, darkened for text | `#C13A0B` label on `#FCE9E1`, `#FF4B11` ring at 3.02:1 on moon | `#FF8F6B` label on `#38201A` | The warning family is the darkened end of the same hue, so "careful" and "live" are two jobs of one accent rather than two accents. That is the table's two-meaning case, and it is why blazing cannot take a third job. |
| Band surfaces | White and Moon | `#FFFFFF` / `#F5F3EB` | `#1D1D1B` / `#2C2B2B` | Alternating is the rhythm; the two light values sit 1.11:1 apart, the two dark values 1.2:1 apart, which is a shift rather than a second brand. |
| Chrome: navbar and footer | Genie Blue | `#2353FF` | `#2353FF` | The same blue in both themes, so the page opens and closes on one colour. Anything sitting on that bar takes literal values, not theme tokens. |

Rules that follow from the table:

- Blue owns "you can act on this". Never spend the third accent on a primary action or on body copy, or the action colour stops being a signal.
- The warm accents cannot be text on a light canvas (vanilla 1.64:1, blazing 3.35:1, raspberry 2.24:1). They work as filled shapes with midnight text inside, or as colour on a dark surface.
- Vanilla Sunset `#FEC104` has no consumer on the site today. It is reserved, not an invitation: at 1.64:1 on white it can only ever be a filled shape with midnight text inside (10.33:1), so it can carry a mark but never a label, a link or body copy. Raspberry Blush `#F8908F` is in the same position and is darkened to `#C2185B` whenever it has to clear 3:1 on a light surface.
- Caramel Delight `#FCE4C6` is a surface tint, not an accent. The hero uses it in both themes.

### Track hues

The five track accents are not in the brand book. They exist because a track rail carries one colour per track, and three of the five are the languages' own colours, which a developer already recognises.

| Track | Hue | Light | Dark | On the light tab (`#FFFFFF`) | On the dark tab (`#1D1D1B`) |
|---|---|---|---|---|---|
| dApp and smart contracts | Genie Blue | `#2353FF` | `#4D91FF` | 5.60:1 | 5.47:1 |
| Infrastructure and DevOps | Raspberry, darkened | `#C2185B` | `#F8908F` | 5.87:1 | 7.54:1 |
| Core protocol, Haskell | Haskell purple | `#5D4E8C` | `#A794DE` | 7.16:1 | 6.38:1 |
| Core protocol, Rust | Rust orange | `#CE422B` | `#F0764F` | 4.73:1 | 5.96:1 |
| Core protocol, Go | Go cyan, darkened | `#0B87AD` | `#45C4E6` | 4.13:1 | 8.27:1 |

- They are marks and washes only, never body text: the tab field is a tint mixed from the hue (opaque once resolved), and the hue itself sits on the stripe and the glyph.
- Two are ours, three are the languages': dApp takes brand blue, Infrastructure takes Raspberry darkened because the blush is 2.24:1 on white and unreadable as a mark.
- Each hue has a light value and a dark value. Go's real `#00ADD8` is 2.64:1 on white and Haskell purple `#5D4E8C` is 2.36:1 on midnight, so a single value cannot serve both.

### Dark theme tokens

Declare dark values on `html[data-theme='dark']`, never on a bare `[data-theme='dark']` block.

Infima declares its own dark tokens on `html[data-theme='dark']`, which is one class and one attribute (0,1,1). A bare attribute selector is 0,1,0, so it loses every contested token even though it loads later. The failure is silent and looks like a token that works in light mode and does nothing in dark mode. This was live once: the warning callouts stayed Infima mustard for a build while the brand values sat unused in the file.

## Typography

- Primary: **Poppins** (Google Fonts / Adobe Fonts)
- Fallback: **Helvetica** or **Arial**
- Headlines: bold, sentence case, leading 1.15
- Body: medium, regular, or light depending on readability

## DevEx Portal Logo and Iconography

The Developer Experience portal uses its own logo and iconography in the navbar and favicon (`website/static/img/`). This is distinct from the primary Intersect logo mark.

- Preserve the DevEx navbar logo and favicon as the site's identifying marks.
- Apply the same care as the Intersect logo: do not distort, rotate, or alter them.
- When updating the site, ensure the navbar logo and favicon remain consistent with the DevEx portal identity.

## Visual Restrictions

- No gradients. Nothing on the portal uses one today: the navbar and footer are flat brand blue surfaces and `custom.css` contains no `linear-gradient`.
- No blend modes.
- Solid fills for every shape that carries a label: buttons, chips, cards, bands. A fill under text is always opaque, and a colour never becomes a text colour by being made translucent.
- Alpha is allowed for depth and scrims only: `box-shadow`, focus rings, and overlay washes. This is how the elevation tokens and the dark footer's overlay work, and it resolves to a shape rather than a colour decision.
- Soft, rounded shapes; avoid sharp corners and thin lines.
- Do not distort, rotate, or alter the Intersect logo mark or the DevEx portal marks.

## Mission-Aligned Framing

When relevant, connect to the shared mission:

> Building together to shape the future of Cardano.
