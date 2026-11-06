// @theme-original, not @theme: inside the swizzle of a component, @theme resolves to
// the swizzle itself and the module initialises before it exists.
import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import GitHubIconNavbarItem from '@site/src/components/NavbarItems/GitHubIcon';
import ColorModeToggleNavbarItem from '@site/src/components/NavbarItems/ColorModeToggle';

/**
 * Two custom navbar item types, both so an item can be where it belongs in the markup:
 * the GitHub mark in place of a text link, and the theme toggle emitted in its real
 * position rather than appended after the configured items (see #377).
 */
export default {
  ...ComponentTypes,
  'custom-githubIcon': GitHubIconNavbarItem,
  'custom-colorModeToggle': ColorModeToggleNavbarItem,
};
