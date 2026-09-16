import { Metadata } from 'next';
import Link from 'next/link';

import { usesGroups } from '@/lib/constants/uses';
import { defaultMetadata } from '@/lib/constants/metadata';

import Wrapper from '@/components/wrapper';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Uses | Aritro Roy - Full Stack Developer",
  description: "The editor, machines and everyday tools Aritro Roy builds with.",
  openGraph: {
    title: "Uses | Aritro Roy - Full Stack Developer",
    description: "The editor, machines and everyday tools Aritro Roy builds with.",
    ...defaultMetadata.openGraph,
  },
  twitter: {
    title: "Uses | Aritro Roy - Full Stack Developer",
    description: "The editor, machines and everyday tools Aritro Roy builds with.",
    ...defaultMetadata.twitter,
  },
};

const UsesPage = () => {
  return (
    <Wrapper>
      <section>
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-bold'>Uses</h1>
          <p className='text-neutral-500'>What I actually reach for, day to day.</p>
        </div>
      </section>

      <section>
        <div className='flex flex-col gap-5'>
          {usesGroups.map((group) => (
            <div className='flex flex-col gap-2.5' key={group.category}>
              <p className='text-sm text-neutral-500'>{group.category}</p>

              <div className='flex flex-col gap-2.5'>
                {group.items.map((item) => {
                  const content = (
                    <>
                      <item.icon className='h-4 w-4 text-neutral-400 shrink-0' />
                      <span className='text-white'>{item.name}</span>
                      {item.note && (
                        <span className='text-neutral-500'>{"- "}{item.note}</span>
                      )}
                    </>
                  );

                  return 'link' in item && item.link ? (
                    <Link
                      href={item.link}
                      target='_blank'
                      className='flex items-center gap-2.5 hover:text-white transition-colors'
                      key={item.name}
                    >
                      {content}
                    </Link>
                  ) : (
                    <div className='flex items-center gap-2.5' key={item.name}>
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Wrapper>
  )
}

export default UsesPage
