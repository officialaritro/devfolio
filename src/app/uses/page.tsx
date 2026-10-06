import { Metadata } from 'next';
import Link from 'next/link';

import { usesSections } from '@/lib/constants/uses';
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

      {usesSections.map((section) => (
        <section
          id={section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
          data-toc-level={section.level}
          key={section.title}
        >
          <div className='flex flex-col gap-2.5'>
            <h3 className={section.level === 0 ? 'text-xl font-bold' : 'text-sm text-neutral-500'}>{section.title}</h3>

            {section.items.length > 0 && (
              <div className='flex flex-col gap-2.5'>
                {section.items.map((item) => {
                  const content = (
                    <>
                      {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.image} alt='' className='h-[18px] w-[18px] -mx-px shrink-0 rounded-[3px] object-contain' />
                      ) : item.icon ? (
                        <item.icon className='h-4 w-4 text-neutral-400 shrink-0' />
                      ) : null}
                      <span className='text-white'>{item.name}</span>
                      {item.note && (
                        <span className='text-neutral-500'>{"- "}{item.note}</span>
                      )}
                    </>
                  );

                  return item.link ? (
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
            )}
          </div>
        </section>
      ))}
    </Wrapper>
  )
}

export default UsesPage
