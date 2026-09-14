export type ToolStatus = 'active' | 'new' | 'deprecated' | 'beta' | 'incubation';

export type ToolCategory =
  | 'on-chain-language'
  | 'off-chain-sdk'
  | 'api-indexer'
  | 'dev-environment'
  | 'learning'
  | 'layer2-zk'
  | 'governance'
  | 'wallet';

export interface ToolLink {
  label: string;
  url: string;
}

export interface CardanoTool {
  id: string;
  name: string;
  tagline: string;
  category: ToolCategory;
  status: ToolStatus;
  description: string;
  stats?: string;
  links: ToolLink[];
}

export const CATEGORY_LABELS: Record<ToolCategory, string> = {
  'on-chain-language': 'On-chain Languages',
  'off-chain-sdk': 'Off-chain SDKs',
  'api-indexer': 'APIs & Indexers',
  'dev-environment': 'Dev Environments',
  'learning': 'Learning Platforms',
  'layer2-zk': 'L2 / ZK / Advanced',
  'governance': 'Governance Tooling',
  'wallet': 'Wallets',
};
