import React from 'react'

import Link from 'next/link'

import { aboutIntro, aboutParagraphs, aboutRoles, type AboutChip } from '@/lib/constants/about-me'

const Chip = ({ chip }: { chip: AboutChip }) => (
  <Link
    href={chip.href}
    target={chip.href.startsWith('http') ? '_blank' : undefined}
    className='inline-flex items-center gap-1.5 rounded-md bg-zinc-800 px-2 py-0.5 text-neutral-300 transition-colors hover:bg-zinc-700 hover:text-white'
  >
    {chip.avatar && (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={`https://github.com/${chip.avatar}.png?size=40`} alt='' width={16} height={16} className='rounded-sm' />
    )}
    {chip.name}
  </Link>
)

const AboutMeSection = () => {
  return (
    <section>
      <div className='flex flex-col gap-5'>
        <h1 className='text-4xl font-bold'>Aritro Roy</h1>

        <p className='text-lg text-neutral-400'>{aboutIntro}</p>

        <div className='flex flex-col gap-2 text-neutral-400'>
          {aboutRoles.map((role) => (
            <div className='flex flex-wrap items-center gap-2' key={role.label}>
              <span>{role.label}</span>
              {role.chips.map((chip) => (
                <Chip chip={chip} key={chip.name} />
              ))}
            </div>
          ))}
        </div>

        {aboutParagraphs.map((item) => (
          <p
            className='text-neutral-400 leading-relaxed [&_a]:text-white'
            key={item}
            dangerouslySetInnerHTML={{ __html: item }}
          />
        ))}
      </div>
    </section>
  )
}

export default AboutMeSection
