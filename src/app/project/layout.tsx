import type { Metadata } from 'next';

import { defaultMetadata } from '@/lib/constants/metadata';

export const metadata: Metadata = {
  title: {
    default: 'Aritro Roy',
    template: '%s | Aritro Roy',
  },
  ...defaultMetadata
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (children);
}