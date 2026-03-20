/**
 * Custom category item used by the docs sidebar.  Only a small portion of the
 * original file is modified: the label rendering.  We truncate long labels and
 * add a tooltip so the UI doesn't break on mobile.
 *
 * The rest of this component is copied verbatim from the upstream theme so that
 * behavior remains compatible with future releases; updates can be pulled in by
 * re‑swizzling or diffing against the official source.
 */

import React, {
  type ComponentProps,
  type ReactNode,
  useEffect,
  useMemo,
} from 'react';
import clsx from 'clsx';
import {
  ThemeClassNames,
  useThemeConfig,
  usePrevious,
  Collapsible,
  useCollapsible,
} from '@docusaurus/theme-common';
import {isSamePath} from '@docusaurus/theme-common/internal';
import {
  isActiveSidebarItem,
  findFirstSidebarItemLink,
  useDocSidebarItemsExpandedState,
  useVisibleSidebarItems,
} from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import {translate} from '@docusaurus/Translate';
import useIsBrowser from '@docusaurus/useIsBrowser';
import DocSidebarItems from '@theme/DocSidebarItems';
import DocSidebarItemLink from '@theme/DocSidebarItem/Link';
import type {Props} from '@theme/DocSidebarItem/Category';

import type {
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from '@docusaurus/plugin-content-docs';
import styles from './styles.module.css';

// same helper used in Link component
const MAX_LABEL_LENGTH = 25;
function truncateText(label: string) {
  if (label.length <= MAX_LABEL_LENGTH) {
    return label;
  }
  return label.substring(0, MAX_LABEL_LENGTH - 3) + '...';
}

function CategoryLinkLabel({label}: {label: string}) {
  const display = truncateText(label);
  return (
    <span title={label} className={styles.categoryLinkLabel}>
      {display}
    </span>
  );
}

// rest of file unchanged, copied from upstream

// If we navigate to a category and it becomes active, it should automatically  
// expand itself
function useAutoExpandActiveCategory({
  isActive,
  collapsed,
  updateCollapsed,
  activePath,
}: {
  isActive: boolean;
  collapsed: boolean;
  updateCollapsed: (b: boolean) => void;
  activePath: string;
}) {
  const wasActive = usePrevious(isActive);
  const previousActivePath = usePrevious(activePath);
  useEffect(() => {
    const justBecameActive = isActive && !wasActive;
    const stillActiveButPathChanged =
      isActive && wasActive && activePath !== previousActivePath;
    if ((justBecameActive || stillActiveButPathChanged) && collapsed) {
      updateCollapsed(false);
    }
  }, [
    isActive,
    wasActive,
    collapsed,
    updateCollapsed,
    activePath,
    previousActivePath,
  ]);
}

/**
 * When a collapsible category has no link, we still link it to its first child 
 * during SSR as a temporary fallback. This allows to be able to navigate inside
 * the category even when JS fails to load, is delayed or simply disabled        
 * React hydration becomes an optional progressive enhancement
 * see https://github.com/facebookincubator/infima/issues/36#issuecomment-772543
 * see https://github.com/facebook/docusaurus/issues/3030
 */
function useCategoryHrefWithSSRFallback(
  item: Props['item'],
): string | undefined {
  const isBrowser = useIsBrowser();
  return useMemo(() => {
    if (item.href && !item.linkUnlisted) {
      return item.href;
    }
    // In these cases, it's not necessary to render a fallback
    // We skip the "findFirstCategoryLink" computation
    if (isBrowser || !item.collapsible) {
      return undefined;
    }
    return findFirstSidebarItemLink(item);
  }, [item, isBrowser]);
}

function CollapseButton({
  collapsed,
  categoryLabel,
  onClick,
}: {
  collapsed: boolean;
  categoryLabel: string;
  onClick: ComponentProps<'button'>['onClick'];
}) {
  return (
    <button
      aria-label={
        collapsed
          ? translate(
              {
                id: 'theme.DocSidebarItem.expandCategoryAriaLabel',
                message: "Expand sidebar category '{label}'",
                description: 'The ARIA label to expand the sidebar category',   
              },
              {label: categoryLabel},
            )
          : translate(
              {
                id: 'theme.DocSidebarItem.collapseCategoryAriaLabel',
                message: "Collapse sidebar category '{label}'",
                description: 'The ARIA label to collapse the sidebar category', 
              },
              {label: categoryLabel},
            )
      }
      aria-expanded={!collapsed}
      type="button"
      className="clean-btn menu__caret"
      onClick={onClick}
    >
      {/* SVG chevron; right when collapsed, down when expanded */}
      <svg
        className={styles.caretIcon}
        aria-hidden="true"
        viewBox="0 0 8 8"
        width="8"
        height="8">
        {collapsed ? (
          <path
            d="M2 1l4 3-4 3"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M1 2l3 4 3-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}

export default function DocSidebarItemCategory(props: Props): ReactNode {
  const visibleChildren = useVisibleSidebarItems(
    props.item.items,
    props.activePath,
  );
  if (visibleChildren.length === 0) {
    return <DocSidebarItemCategoryEmpty {...props} />;
  } else {
    return <DocSidebarItemCategoryCollapsible {...props} />;
  }
}

function isCategoryWithHref(
  category: PropSidebarItemCategory,
): category is PropSidebarItemCategory & {href: string} {
  return typeof category.href === 'string';
}

// If a category doesn't have any visible children, we render it as a link      
function DocSidebarItemCategoryEmpty({item, ...props}: Props): ReactNode {      
  // If the category has no link, we don't render anything
  // It's not super useful to render a category you can't open nor click        
  if (!isCategoryWithHref(item)) {
    return null;
  }
  // We remove props that don't make sense for a link and forward the rest      
  const {
    type,
    collapsed,
    collapsible,
    items,
    linkUnlisted,
    ...forwardableProps
  } = item;
  const linkItem: PropSidebarItemLink = {
    type: 'link',
    ...forwardableProps,
  };
  return <DocSidebarItemLink item={linkItem} {...props} />;
}

function DocSidebarItemCategoryCollapsible({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}: Props): ReactNode {
  const {items, label, collapsible, className, href} = item;
  const {
    docs: {
      sidebar: {autoCollapseCategories},
    },
  } = useThemeConfig();
  const hrefWithSSRFallback = useCategoryHrefWithSSRFallback(item);
  const isActive = isActiveSidebarItem(item, activePath);
  const {
    collapsed,
    toggleCollapsed,
    setCollapsed: setCollapsedRaw,
  } = useCollapsible({
    initialState: () =>
      !item.collapsible ||
      (item.collapsible && item.collapsed) ||
      (isActive && !autoCollapseCategories),
  });
  const setCollapsed = (value: boolean) => {
    // categories are never collapsed when they are active (clicked on)
    if (!value && isActive) {
      return;
    }

    setCollapsedRaw(value);
    if (onItemClick) {
      onItemClick(item);
    }
  };
  useAutoExpandActiveCategory({
    isActive,
    collapsed,
    updateCollapsed: setCollapsed,
    activePath,
  });

  // expanded state across all sidebar items (used for auto-collapsing)
  const {expandedItem, setExpandedItem} = useDocSidebarItemsExpandedState();
  // Use this instead of `setCollapsed`, because it is also reactive
  const updateCollapsed = (toCollapsed: boolean = !collapsed) => {
    setExpandedItem(toCollapsed ? null : index);
    setCollapsed(toCollapsed);
  };

  const itemsProps = {
    ...props,
    level: level + 1,
    activePath,
    onItemClick,
    index,
  };
  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemCategory,
        ThemeClassNames.docs.docSidebarItemCategoryLevel(level),
        'menu__list-item',
        className,
      )}
      key={label}>
      <div
        className={clsx(styles.categoryLink, {
          [styles.categoryLinkWithHref]: hrefWithSSRFallback,
        })}>
        {hrefWithSSRFallback ? (
          <Link
            className={clsx('menu__link', {
              'menu__link--active': isActive,
              'menu__link--sublist': true,
            })}
            to={hrefWithSSRFallback}
            {...(href && isInternalUrl(href) && {
              onClick: onItemClick ? () => onItemClick(item) : undefined,
            })}>
            <CategoryLinkLabel label={label} />
          </Link>
        ) : (
          <span
            className={clsx('menu__link', 'menu__link--sublist', {
              'menu__link--active': isActive,
            })}>
            <CategoryLinkLabel label={label} />
          </span>
        )}
        {collapsible && (
          <CollapseButton
            collapsed={collapsed}
            categoryLabel={label}
            onClick={toggleCollapsed}
          />
        )}
      </div>
      {collapsible ? (
        <Collapsible lazy as="ul" className="menu__list" collapsed={collapsed}>
          <DocSidebarItems items={items} {...itemsProps} />
        </Collapsible>
      ) : (
        <DocSidebarItems items={items} {...itemsProps} />
      )}
    </li>
  );
}
