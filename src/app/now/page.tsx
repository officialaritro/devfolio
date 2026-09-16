import { Metadata } from 'next';

import { defaultMetadata } from '@/lib/constants/metadata';

import Wrapper from '@/components/wrapper';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Now | Aritro Roy - Full Stack Developer",
  description: "What Aritro Roy is focused on right now.",
  openGraph: {
    title: "Now | Aritro Roy - Full Stack Developer",
    description: "What Aritro Roy is focused on right now.",
    ...defaultMetadata.openGraph,
  },
  twitter: {
    title: "Now | Aritro Roy - Full Stack Developer",
    description: "What Aritro Roy is focused on right now.",
    ...defaultMetadata.twitter,
  },
};

const NOW_UPDATED = 'September, 2026';

const NowPage = () => {
  return (
    <Wrapper>
      <section>
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-bold'>Now</h1>
          <p className='text-neutral-500'>Last updated {NOW_UPDATED}.</p>
        </div>
      </section>

      <section>
        <ul className='flex list-disc ml-4 flex-col gap-2'>
          <li className='text-neutral-400'>
            Building out a multi-tenant document intelligence platform for commercial real estate leases as an SDE at{' '}
            <span className='text-white'>Whatbytes Technologies</span> - webhook-driven ingestion, Vertex AI extraction, and a Stripe-backed billing engine.
          </li>
          <li className='text-neutral-400'>
            Deep in Rust, AI systems and system design - trading breadth for depth on distributed systems fundamentals.
          </li>
          <li className='text-neutral-400'>
            Keeping the voice-enabled RAG pipeline live and iterating on retrieval quality when I get a free evening - it&apos;s at{' '}
            <a href="http://ragingoa.duckdns.org/" target="_blank" rel="noopener noreferrer" className='text-white hover-animation relative'>ragingoa.duckdns.org</a>.
          </li>
        </ul>
      </section>
    </Wrapper>
  )
}

export default NowPage
