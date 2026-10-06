import React from 'react'

import Link from 'next/link'

import { GitMerge, GitPullRequest } from 'lucide-react'

import { openSourceProjects, prUrl, type OpenSourceProject } from '@/lib/constants/open-source'

export const OpenSourceList = ({ projects }: { projects: OpenSourceProject[] }) => {
  return (
    <ul className='flex flex-col gap-5'>
      {projects.map((project) => (
        <li className='flex flex-col gap-2' key={project.repo}>
          <div className='flex flex-col'>
            <Link
              href={`https://github.com/${project.repo}`}
              target='_blank'
              className='text-white underline hover:text-neutral-300 transition-colors w-fit'
            >
              {project.repo}
            </Link>
            <p className='text-neutral-500 text-sm'>{project.blurb}</p>
          </div>

          <ul className='flex flex-col gap-1.5'>
            {project.prs.map((pr) => (
              <li className='flex items-start gap-2 text-neutral-400' key={pr.number}>
                {pr.state === 'merged'
                  ? <GitMerge className='w-4 h-4 mt-1 shrink-0 text-purple-400' aria-label='Merged' />
                  : <GitPullRequest className='w-4 h-4 mt-1 shrink-0 text-green-500' aria-label='Open' />}
                <Link
                  href={prUrl(project.repo, pr.number)}
                  target='_blank'
                  className='hover:text-white transition-colors break-words'
                >
                  {pr.title} <span className='text-neutral-600'>#{pr.number}</span>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

const OpenSourceSection = () => {
  const featured = openSourceProjects.filter((project) => project.featured)

  return (
    <section id='open-source'>
      <div className='flex flex-col gap-3'>
        <h3 className='text-xl font-bold'>Open Source</h3>
        <OpenSourceList projects={featured} />
        <Link href='/projects' className='text-sm text-neutral-500 hover:text-white transition-colors w-fit'>
          All contributions and projects &rarr;
        </Link>
      </div>
    </section>
  )
}

export default OpenSourceSection
