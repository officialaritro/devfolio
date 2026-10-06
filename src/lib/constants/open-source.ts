export type PrState = 'merged' | 'open';

export interface OpenSourcePr {
  number: number;
  title: string;
  state: PrState;
}

export interface OpenSourceProject {
  name: string;
  repo: string;
  blurb: string;
  featured?: boolean;
  prs: OpenSourcePr[];
}

export const openSourceProjects: OpenSourceProject[] = [
  {
    name: 'pnpm',
    repo: 'pnpm/pnpm',
    blurb: 'Fast, disk space efficient package manager for Node.js.',
    featured: true,
    prs: [
      { number: 16474, title: 'fix(deps-resolver): let a hoisted required peer follow its provider', state: 'merged' },
      { number: 16371, title: 'fix(executor): read only PATH, not Path, for scripts outside Windows', state: 'merged' },
      { number: 16274, title: 'fix(resolving): keep the cause of an unrecognized resolver error', state: 'merged' },
      { number: 16246, title: 'test(pnpr): add a cold resolution-cache benchmark scenario', state: 'open' },
    ],
  },
  {
    name: 'Plane',
    repo: 'makeplane/plane',
    blurb: 'Open source project management tool.',
    prs: [
      { number: 9887, title: 'fix(api): return 404 for non-numeric work item identifiers', state: 'open' },
    ],
  },
  {
    name: 'Patchwork',
    repo: 'patched-codes/patchwork',
    blurb: 'Automates development gruntwork with AI patchflows.',
    prs: [
      { number: 1663, title: 'fix: preserve original line endings when patching files', state: 'open' },
      { number: 1662, title: 'Fix/1235 preserve work on push failure', state: 'open' },
    ],
  },
];

export const prUrl = (repo: string, number: number) => `https://github.com/${repo}/pull/${number}`;
