import React from 'react'

import { experiences } from '@/lib/constants/experience'
import { CircleDot } from 'lucide-react'

const ExperienceSection = () => {
  return (
    <section>
      <div className='flex flex-col gap-2'>
        <h3 className='text-xl font-bold'>Experience</h3>

        <div className="relative pl-4 after:absolute after:inset-y-0 after:w-px after:bg-white/20 after:left-0">
          <ul className="flex flex-col gap-4 list-disc ml-4">
            {experiences.map((item, idx) => (
              <li className='text-neutral-500 flex w-full gap-4 items-start justify-between relative' key={idx}>
                <div className="absolute -left-[21px] top-1">
                  <CircleDot className="h-4 w-4 text-primary text-white" />
                </div>

                <div className='flex flex-col gap-2 flex-1'>
                  <div className='flex gap flex-col'>
                    <p className='text-white'>
                      {item.title}
                    </p>
                    <p>
                      {item.companyName} | {item.workLocation}
                    </p>
                  </div>

                  <p className='text-neutral-400 break-words'>
                    {item.desc}
                  </p>
                </div>

                <div>
                  <p className='flex gap-1 md:flex-row flex-col'>
                    <span>{item.start} {"-"}</span>
                    <span>{item.end || "Present"}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection