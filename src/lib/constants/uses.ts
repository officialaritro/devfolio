import type { ComponentType } from 'react';

import {
  AppWindow,
  AudioLines,
  Bot,
  Captions,
  Code2,
  Coffee,
  Laptop,
  MessagesSquare,
  Mic,
  MousePointer2,
  ScanEye,
  ScanSearch,
  Sparkles,
  TextCursorInput,
  Waves,
  Zap,
} from 'lucide-react';
import {
  SiApplemusic,
  SiCaddy,
  SiCelery,
  SiClaude,
  SiDbeaver,
  SiDocker,
  SiEslint,
  SiGhostty,
  SiGithub,
  SiGooglechrome,
  SiGunicorn,
  SiNgrok,
  SiObsidian,
  SiOpencode,
  SiPnpm,
  SiPostgresql,
  SiPytest,
  SiRedis,
  SiRuff,
  SiRust,
  SiTypescript,
  SiUblockorigin,
  SiUv,
  SiVercel,
  SiVivaldi,
  SiZsh,
} from 'react-icons/si';

interface UsesItem {
  name: string;
  /** Icon component, or an official logo served from /public when no icon pack has one. */
  icon?: ComponentType<{ className?: string }>;
  image?: string;
  link?: string;
  note?: string;
}

/** level 0 = top heading, 1 = sub-section, 2 = nested sub-section (drives TOC and heading indent). */
export interface UsesSection {
  title: string;
  level: 0 | 1 | 2;
  items: UsesItem[];
}

export const usesSections: UsesSection[] = [
  {
    title: 'Hardware',
    level: 0,
    items: [
      { name: 'MacBook Air M4', icon: Laptop, note: 'macOS Sequoia' },
      { name: 'Lenovo V14', icon: Laptop, note: 'Windows 11' },
    ],
  },
  { title: 'Development', level: 0, items: [] },
  {
    title: 'Editor',
    level: 1,
    items: [
      { name: 'VS Code', icon: Code2 },
      { name: 'px0', icon: ScanEye, link: 'https://px0.ai/', note: 'read-only IDE for the AI-agent era, by Arpit Bhayani' },
      { name: 'Zeron', icon: Zap, link: 'https://github.com/wingleeio', note: 'by wingleeio' },
      { name: 'Devin', icon: Bot, link: 'https://devin.ai/' },
    ],
  },
  {
    title: 'AI Coding Agents',
    level: 1,
    items: [
      { name: 'Claude Code', icon: SiClaude, link: 'https://claude.com/claude-code' },
      { name: 'Codex', icon: Sparkles, link: 'https://github.com/openai/codex' },
      { name: 'OpenCode', icon: SiOpencode, link: 'https://opencode.ai/' },
    ],
  },
  {
    title: 'Voice & Dictation',
    level: 1,
    items: [
      { name: 'Wispr Flow', icon: AudioLines, link: 'https://wisprflow.ai/', note: 'voice to text' },
      { name: 'Vowen', icon: Mic, note: 'voice to text' },
      { name: 'Kiwi', icon: Waves, note: 'by Sarvam' },
    ],
  },
  {
    title: 'Browser',
    level: 1,
    items: [
      { name: 'Vivaldi', icon: SiVivaldi },
      { name: 'Chrome', icon: SiGooglechrome },
    ],
  },
  {
    title: 'Browser Extensions',
    level: 2,
    items: [
      { name: 'Refined GitHub', icon: SiGithub, link: 'https://github.com/refined-github/refined-github' },
      { name: 'uBlock Origin Lite', icon: SiUblockorigin, link: 'https://github.com/uBlockOrigin/uBOL-home' },
      { name: 'Fake Filler', icon: TextCursorInput, note: 'form filler' },
      { name: 'Simplify Copilot', icon: Sparkles, note: 'autofill' },
      { name: 'Cursorful', icon: MousePointer2, note: 'screen recorder' },
      { name: 'tl;dv', icon: Captions, link: 'https://tldv.io/', note: 'record, transcribe & chat with meetings' },
      { name: 'Always Active Window', icon: AppWindow },
    ],
  },
  {
    title: 'MacOS Productivity',
    level: 1,
    items: [
      { name: 'Atoll', image: '/uses/atoll.png', link: 'https://getatoll.app', note: 'Dynamic Island for macOS' },
      { name: 'Caffeine & Amphetamine', icon: Coffee, note: 'keep the Mac awake' },
      { name: 'gyotaku', icon: ScanSearch, link: 'https://github.com/xevrion/gyotaku', note: 'screenshot finder' },
      { name: 'btop', image: '/uses/btop.svg', link: 'https://github.com/aristocratos/btop', note: 'system info' },
    ],
  },
  {
    title: 'Dev Tools',
    level: 1,
    items: [
      { name: 'Docker', icon: SiDocker, link: 'https://www.docker.com/', note: 'containers for local services and deploys' },
      { name: 'Colima', image: '/uses/colima.png', link: 'https://github.com/abiosoft/colima', note: 'container runtime, in place of Docker Desktop' },
      { name: 'DBeaver', icon: SiDbeaver, link: 'https://dbeaver.io/', note: 'database client' },
    ],
  },
  {
    title: 'CLI',
    level: 1,
    items: [
      { name: 'Ghostty', icon: SiGhostty, link: 'https://ghostty.org/', note: 'terminal' },
      { name: 'zsh', icon: SiZsh, note: 'shell' },
      { name: 'pnpm', icon: SiPnpm, link: 'https://pnpm.io/', note: 'preferred package manager' },
      { name: 'uv', icon: SiUv, link: 'https://docs.astral.sh/uv/', note: 'Python package and project manager' },
      { name: 'uvicorn', image: '/uses/uvicorn.png', link: 'https://www.uvicorn.org/', note: 'ASGI server for FastAPI apps' },
      { name: 'Gunicorn', icon: SiGunicorn, link: 'https://gunicorn.org/', note: 'production server for Django apps' },
      { name: 'Celery', icon: SiCelery, link: 'https://docs.celeryq.dev/', note: 'background task workers' },
      { name: 'pytest', icon: SiPytest, link: 'https://pytest.org/', note: 'Python tests' },
      { name: 'Ruff', icon: SiRuff, link: 'https://docs.astral.sh/ruff/', note: 'Python linter and formatter' },
      { name: 'tsx', image: '/uses/tsx.svg', link: 'https://tsx.is/', note: 'run TypeScript files without compiling' },
      { name: 'TypeScript', icon: SiTypescript, link: 'https://www.typescriptlang.org/', note: 'type-checking with tsc' },
      { name: 'ESLint', icon: SiEslint, link: 'https://eslint.org/', note: 'JavaScript and TypeScript linter' },
      { name: 'Playwright', image: '/uses/playwright.png', link: 'https://playwright.dev/', note: 'browser end-to-end tests' },
      { name: 'Cargo', icon: SiRust, link: 'https://doc.rust-lang.org/cargo/', note: 'Rust build tool, with clippy and rustfmt' },
      { name: 'AWS CLI', image: '/uses/aws.png', link: 'https://aws.amazon.com/cli/', note: 'manage AWS from the terminal' },
      { name: 'GitHub CLI', icon: SiGithub, link: 'https://cli.github.com/', note: 'PRs and issues from the terminal' },
      { name: 'Vercel CLI', icon: SiVercel, link: 'https://vercel.com/docs/cli', note: 'deploy and preview frontends' },
      { name: 'jq', image: '/uses/jq.svg', link: 'https://jqlang.org/', note: 'slice and filter JSON' },
      { name: 'ngrok', icon: SiNgrok, link: 'https://ngrok.com/', note: 'expose localhost with a public URL' },
      { name: 'Caddy', icon: SiCaddy, link: 'https://caddyserver.com/', note: 'reverse proxy with automatic HTTPS' },
      { name: 'psql', icon: SiPostgresql, link: 'https://www.postgresql.org/docs/current/app-psql.html', note: 'PostgreSQL shell' },
      { name: 'redis-cli', icon: SiRedis, link: 'https://redis.io/docs/latest/develop/tools/cli/', note: 'inspect Redis from the terminal' },
    ],
  },
  {
    title: 'Everyday',
    level: 0,
    items: [
      { name: 'Obsidian', icon: SiObsidian },
      { name: 'Slack', icon: MessagesSquare },
      { name: 'Apple Music', icon: SiApplemusic },
    ],
  },
];
