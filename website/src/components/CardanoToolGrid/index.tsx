import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { CARDANO_TOOLS } from './data';
import styles from './styles.module.css';
import type { CardanoTool, ToolCategory, ToolStatus } from './types';
import { CATEGORY_LABELS } from './types';

const STATUS_LABEL: Record<ToolStatus, string> = {
  active: 'Active',
  new: 'New',
  incubation: 'Incubation',
  beta: 'Beta',
  deprecated: 'Deprecated',
};

const STATUS_CLASS: Record<ToolStatus, string> = {
  active: styles.badgeActive,
  new: styles.badgeNew,
  incubation: styles.badgeIncubation,
  beta: styles.badgeBeta,
  deprecated: styles.badgeDeprecated,
};

interface CardanoToolGridProps {
  /** Limit to specific categories. If omitted, all categories are shown. */
  categories?: ToolCategory[];
  /** Optional label shown above the grid, e.g. "Interactive reference" */
  label?: string;
}

export default function CardanoToolGrid({ categories, label }: CardanoToolGridProps): ReactNode {
  const tools = categories
    ? CARDANO_TOOLS.filter((t) => categories.includes(t.category))
    : CARDANO_TOOLS;

  // Derive the category list that actually appears in the filtered tools
  const availableCategories: ToolCategory[] = Array.from(
    new Set(tools.map((t) => t.category)),
  );

  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const expandRef = useRef<HTMLDivElement | null>(null);

  const visibleTools: CardanoTool[] =
    activeCategory === 'all'
      ? tools
      : tools.filter((t) => t.category === activeCategory);

  const toggle = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpandedId(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Scroll expand panel into view when it opens
  useEffect(() => {
    if (expandedId && expandRef.current) {
      expandRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [expandedId]);

  // When category filter changes, close any open card
  const handleCategory = (cat: ToolCategory | 'all') => {
    setActiveCategory(cat);
    setExpandedId(null);
  };

  // Group visible tools; keep track of which index is expanded so we can
  // insert the expand panel right after its row.
  const expandedIndex = visibleTools.findIndex((t) => t.id === expandedId);
  const expandedTool = expandedIndex !== -1 ? visibleTools[expandedIndex] : null;

  return (
    <div className={styles.wrapper}>
      {label && <div className={styles.heading}>{label}</div>}

      {/* Category filter tabs */}
      {availableCategories.length > 1 && (
        <div className={styles.tabs} role="tablist" aria-label="Filter by category">
          <button
            role="tab"
            aria-selected={activeCategory === 'all'}
            className={`${styles.tab} ${activeCategory === 'all' ? styles.tabActive : ''}`}
            onClick={() => handleCategory('all')}
          >
            All
          </button>
          {availableCategories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`${styles.tab} ${activeCategory === cat ? styles.tabActive : ''}`}
              onClick={() => handleCategory(cat)}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      )}

      {/* Card grid */}
      <div className={styles.grid}>
        {visibleTools.map((tool, idx) => {
          const isExpanded = tool.id === expandedId;
          return (
            <React.Fragment key={tool.id}>
              <button
                className={`${styles.card} ${isExpanded ? styles.cardExpanded : ''}`}
                onClick={() => toggle(tool.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle(tool.id);
                  }
                }}
                aria-expanded={isExpanded}
                aria-controls={`expand-${tool.id}`}
                title={isExpanded ? 'Click to collapse' : 'Click to see details and links'}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.cardName}>{tool.name}</span>
                  <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', flexShrink: 0 }}>
                    <span className={`${styles.badge} ${STATUS_CLASS[tool.status]}`}>
                      {STATUS_LABEL[tool.status]}
                    </span>
                    <span className={`${styles.caret} ${isExpanded ? styles.caretOpen : ''}`}>
                      ▼
                    </span>
                  </div>
                </div>
                <div className={styles.cardTagline}>{tool.tagline}</div>
              </button>

              {/* Expand panel — inserted after the last card in the current row */}
              {isExpanded && (
                <div
                  id={`expand-${tool.id}`}
                  className={styles.expandPanel}
                  ref={expandRef}
                  role="region"
                  aria-label={`${tool.name} details`}
                >
                  <p className={styles.expandDescription}>{tool.description}</p>
                  <div className={styles.expandLinks}>
                    {tool.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkButton}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {link.label}
                        <span className={styles.linkArrow}>↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
