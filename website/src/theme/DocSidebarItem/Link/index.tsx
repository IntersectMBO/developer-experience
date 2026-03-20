/**
 * Swizzled from @docusaurus/theme-classic to add automatic truncation and
 * a tooltip on long sidebar link labels. The default component allowed
 * two-line wrapping which broke the layout on narrow screens.
 *
 * Docusaurus swizzle command that generated the original file:
 *   npx docusaurus swizzle @docusaurus/theme-classic DocSidebarItem -- --danger
 *
 * We only changed the label rendering and CSS.  Keep the original logic
 * otherwise so upgrades stay easy.
 */

import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {isActiveSidebarItem} from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import type {Props} from '@theme/DocSidebarItem/Link';

import styles from './styles.module.css';

// maximum characters we want to display before truncating
const MAX_LABEL_LENGTH = 35;

function truncateText(label: string) {
  if (label.length <= MAX_LABEL_LENGTH) {
    return label;
  }
  return label.substring(0, MAX_LABEL_LENGTH - 3) + '...';
}

function LinkLabel({label}: {label: string}) {
  const display = truncateText(label);
  // keep the title attribute so the full text is available on hover
  return (
    <span title={label} className={styles.linkLabel}>
      {display}
    </span>
  );
}

export default function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}: Props): ReactNode {
  const {href, label, className, autoAddBaseUrl} = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);
  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        'menu__list-item',
        className,
      )}
      key={label}>
      <Link
        className={clsx(
          'menu__link',
          !isInternalLink && styles.menuExternalLink,
          {
            'menu__link--active': isActive,
          },
        )}
        autoAddBaseUrl={autoAddBaseUrl}
        aria-current={isActive ? 'page' : undefined}
        to={href}
        {...(isInternalLink && {
          onClick: onItemClick ? () => onItemClick(item) : undefined,
        })}
        {...props}>
        <LinkLabel label={label} />
        {!isInternalLink && <IconExternalLink />}
      </Link>
    </li>
  );
}
