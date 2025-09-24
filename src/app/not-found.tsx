import { Metadata } from 'next';

import { defaultMetadata } from '@/lib/constants/metadata';

import Wrapper from '@/components/wrapper';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "404 - Page Not Found | Aritro Roy",
  description: "Oops! The page you're looking for doesn't exist. Return to Aritro's portfolio or explore other sections.",
  openGraph: {
    title: "404 - Page Not Found | Aritro Roy",
    description: "Oops! The page you're looking for doesn't exist. Return to Aritro's portfolio or explore other sections.",
    ...defaultMetadata.openGraph
  },
  twitter: {
    title: "404 - Page Not Found | Aritro Roy",
    description: "Oops! The page you're looking for doesn't exist. Return to Aritro's portfolio or explore other sections.",
    ...defaultMetadata.twitter
  },
  keywords: [
    "404 Page",
    "Page Not Found",
    "Aritro Roy",
    "Full Stack and AI/ML Developer",
    "Portfolio 404",
    "Error Page",
  ],
  robots: "noindex, follow",
};

export default function NotFound() {
  return (
    <Wrapper>
      <section>
        <div className="text-center flex flex-col gap-4 py-4">
          <div className='flex flex-col gap'>
            <h1 className="text-4xl font-bold">404</h1>
            <h2 className="text-xl">Page not found</h2>
          </div>
          <p className="text-muted-foreground">
            Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
      </section>
    </Wrapper>
  )
}