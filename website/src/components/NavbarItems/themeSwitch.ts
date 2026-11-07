import {flushSync} from 'react-dom';

export type ThemeMode = 'light' | 'dark';

type SetColorMode = (mode: ThemeMode) => void;

function paint(theme: ThemeMode) {
  // Written directly, before React commits: the view transition snapshots the DOM as it
  // stands when the callback returns, so an effect that lands later would be captured late
  // and the fade would start from the wrong frame.
  const html = document.documentElement;
  html.setAttribute('data-theme', theme);
  html.style.colorScheme = theme;
}

/**
 * Switch the colour mode as one cross-fade.
 *
 * Without a view transition the global 200ms colour transition on every element turns the
 * switch into a patchwork: the inverted bands jump in their own frame while the page around
 * them is still at the old colour, and the page spends about 150ms as flat grey. The class
 * on <html> turns those element transitions off for the duration, so the cross-fade is the
 * only thing animating.
 *
 * Shared by the bar's toggle and the menu sheet's theme row: two switches that behaved
 * differently would be worse than one.
 */
export function switchTheme(next: ThemeMode | null, setColorMode: SetColorMode): void {
  // Only the two explicit modes are painted here. A `system` value has no data-theme of its
  // own, and both switches only ever emit light or dark.
  if (next !== 'light' && next !== 'dark') return;

  const html = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const startViewTransition = (
    document as Document & {
      startViewTransition?: (callback: () => void) => {finished: Promise<void>};
    }
  ).startViewTransition;

  const swap = () => {
    paint(next);
    flushSync(() => setColorMode(next));
  };

  html.classList.add('theme-switching');

  if (!startViewTransition || reduced) {
    swap();
    // Two frames, not zero: dropping the class in the same task lets the browser re-enable
    // transitions before it paints, and the instant switch turns back into the grey smear it
    // was meant to avoid.
    requestAnimationFrame(() => requestAnimationFrame(() => html.classList.remove('theme-switching')));
    return;
  }

  startViewTransition.call(document, swap).finished.finally(() => html.classList.remove('theme-switching'));
}
