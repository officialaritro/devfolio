import React from 'react'

import { skills } from '@/lib/constants/skills'

import Pill from '../ui/pill'

const SkillsSection = () => {
  return (
    <section id='skills'>
      <div className='flex flex-col gap-3'>
        <h3 className='text-xl font-bold'>Skills</h3>

        <div className='flex flex-col gap-3'>
          {skills.map((group) => (
            <div className='flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-3' key={group.category}>
              <p className='text-sm text-neutral-500 shrink-0 sm:w-40'>{group.category}</p>

              <div className='flex flex-wrap gap-2'>
                {group.items.map((item) => (
                  <Pill key={item}>{item}</Pill>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
