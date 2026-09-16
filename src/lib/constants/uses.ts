import type { ComponentType } from 'react';

import { Code2, Laptop, MessagesSquare, ScanEye } from 'lucide-react';
import {
  SiApplemusic,
  SiDbeaver,
  SiDocker,
  SiGhostty,
  SiGooglechrome,
  SiObsidian,
  SiVivaldi,
} from 'react-icons/si';

interface UsesItem {
  name: string;
  icon: ComponentType<{ className?: string }>;
  link?: string;
  note?: string;
}

export const usesGroups: { category: string; items: UsesItem[] }[] = [
  {
    category: 'Editor',
    items: [
      { name: 'VS Code', icon: Code2 },
      { name: 'px0', icon: ScanEye, link: 'https://px0.ai/', note: 'read-only IDE for the AI-agent era, by Arpit Bhayani' },
    ],
  },
  {
    category: 'Machines',
    items: [
      { name: 'MacBook Air M4', icon: Laptop, note: 'macOS Sequoia' },
      { name: 'Lenovo V14', icon: Laptop, note: 'Windows 11' },
    ],
  },
  {
    category: 'Terminal & Dev Tools',
    items: [
      { name: 'Ghostty', icon: SiGhostty },
      { name: 'Docker', icon: SiDocker },
      { name: 'DBeaver', icon: SiDbeaver },
    ],
  },
  {
    category: 'Everyday',
    items: [
      { name: 'Vivaldi', icon: SiVivaldi },
      { name: 'Chrome', icon: SiGooglechrome },
      { name: 'Obsidian', icon: SiObsidian },
      { name: 'Slack', icon: MessagesSquare },
      { name: 'Apple Music', icon: SiApplemusic },
    ],
  },
];
