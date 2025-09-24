import React from 'react'

import { aboutMeContent } from '@/lib/constants/about-me'

const AboutMeSection = () => {
  return (
    <section>
      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl font-bold'>Hi, I&apos;m Shivam Taneja</h1>

        <ul className='flex list-disc ml-4 flex-col gap-2'>
          {aboutMeContent.map((item) => (
            <li
              className='text-neutral-500 font-semibold'
              key={item}
              dangerouslySetInnerHTML={{ __html: item }}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default AboutMeSection