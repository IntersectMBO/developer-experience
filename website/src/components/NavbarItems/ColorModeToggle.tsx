import type {ReactNode} from 'react';
import ColorModeToggle from '@theme/ColorModeToggle';
import {useColorMode, useThemeConfig} from '@docusaurus/theme-common';
import {switchTheme} from './themeSwitch';

/**
 * The theme toggle as a navbar item, so it can sit where it belongs in the markup instead of
 * being appended after the configured items.
 *
 * Docusaurus renders its own toggle last inside `theme/Navbar/Content`, and moving that with
 * CSS `order` puts the visual ahead of the tab order (issue #377). With
 * `colorMode.disableSwitch` on, the built-in one is gone and this item carries the real
 * position, in the DOM and in the sheet.
 *
 * The switch itself lives in ./themeSwitch, shared with the menu sheet's theme row.
 */
export default function ColorModeToggleNavbarItem(): ReactNode {
  const {respectPrefersColorScheme} = useThemeConfig().colorMode;
  const {colorModeChoice, setColorMode} = useColorMode();

  return (
    <ColorModeToggle
      respectPrefersColorScheme={respectPrefersColorScheme}
      value={colorModeChoice}
      onChange={(next) => switchTheme(next, setColorMode)}
    />
  );
}
