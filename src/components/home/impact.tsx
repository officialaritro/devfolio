import React from 'react'

import { impactStats } from '@/lib/constants/impact'

const ImpactSection = () => {
  return (
    <section>
      <div className='flex flex-col gap-3'>
        <h3 className='text-xl font-bold'>Impact</h3>

        <div className='grid sm:grid-cols-2 gap-x-8 gap-y-4'>
          {impactStats.map((stat) => (
            <div className='flex flex-col gap-0.5' key={stat.label}>
              <p className='text-2xl font-bold text-white'>{stat.value}</p>
              <p className='text-sm text-neutral-500'>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ImpactSection
