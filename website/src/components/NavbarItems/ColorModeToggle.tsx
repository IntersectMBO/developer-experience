import type {ReactNode} from 'react';
import {flushSync} from 'react-dom';
import ColorModeToggle from '@theme/ColorModeToggle';
import {useColorMode, useThemeConfig} from '@docusaurus/theme-common';

/**
 * The theme toggle as a navbar item, so it can sit where it belongs in the markup
 * instead of being appended after the configured items.
 *
 * Docusaurus renders its own toggle last inside `theme/Navbar/Content`, and moving that
 * with CSS `order` puts the visual ahead of the tab order (issue #377). With
 * `colorMode.disableSwitch` on, the built-in one is gone and this item carries the real
 * position, in the DOM and in the drawer.
 *
 * The switch itself goes through a view transition. Without one, the global 200ms colour
 * transition on every element turns the switch into a patchwork: the inverted bands jump
 * in their own frame while the page around them is still at the old colour, and the page
 * spends about 150ms as flat grey before it settles. A view transition cross-fades one
 * snapshot against the next, so every element moves together.
 */

type Mode = 'light' | 'dark';

function paint(theme: Mode) {
  // Written directly, before React commits: the view transition snapshots the DOM as it
  // stands when the callback returns, so an effect that lands later would be captured
  // late and the fade would start from the wrong frame.
  const html = document.documentElement;
  html.setAttribute('data-theme', theme);
  html.style.colorScheme = theme;
}

export default function ColorModeToggleNavbarItem(): ReactNode {
  const {respectPrefersColorScheme} = useThemeConfig().colorMode;
  const {colorModeChoice, setColorMode} = useColorMode();

  const onChange = (next: Mode | null) => {
    // Only the two explicit modes are painted here. A `system` value has no data-theme of
    // its own, and the toggle only ever emits light or dark anyway.
    if (next !== 'light' && next !== 'dark') return;
    const html = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const startViewTransition = (
      document as Document & {
        startViewTransition?: (cb: () => void) => {finished: Promise<void>};
      }
    ).startViewTransition;

    const swap = () => {
      paint(next);
      flushSync(() => setColorMode(next));
    };

    // Element transitions stay off for the duration, so the cross-fade is the only thing
    // animating. Leaving them on would dissolve two animating pages at once.
    html.classList.add('theme-switching');

    if (!startViewTransition || reduced) {
      swap();
      // Two frames, not zero: dropping the class in the same task lets the browser
      // re-enable transitions before it paints, and the instant switch turns back into the
      // grey smear it was meant to avoid.
      requestAnimationFrame(() => requestAnimationFrame(() => html.classList.remove('theme-switching')));
      return;
    }

    startViewTransition
      .call(document, swap)
      .finished.finally(() => html.classList.remove('theme-switching'));
  };

  return (
    <ColorModeToggle
      respectPrefersColorScheme={respectPrefersColorScheme}
      value={colorModeChoice}
      onChange={onChange}
    />
  );
}
