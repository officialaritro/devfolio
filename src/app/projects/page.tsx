import { Metadata } from 'next';
import Link from 'next/link';

import { openSourceProjects } from '@/lib/constants/open-source';
import { sideProjects } from '@/lib/constants/side-projects';
import { defaultMetadata } from '@/lib/constants/metadata';

import { OpenSourceList } from '@/components/home/open-source';
import Wrapper from '@/components/wrapper';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Projects | Aritro Roy - Full Stack Developer",
  description: "Open source contributions and side projects by Aritro Roy.",
  openGraph: {
    title: "Projects | Aritro Roy - Full Stack Developer",
    description: "Open source contributions and side projects by Aritro Roy.",
    ...defaultMetadata.openGraph,
  },
  twitter: {
    title: "Projects | Aritro Roy - Full Stack Developer",
    description: "Open source contributions and side projects by Aritro Roy.",
    ...defaultMetadata.twitter,
  },
};

const ProjectsPage = () => {
  return (
    <Wrapper>
      <section>
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-bold'>Projects</h1>
          <p className='text-neutral-500'>Open source I contribute to, and things I build on my own.</p>
        </div>
      </section>

      <section>
        <div className='flex flex-col gap-3'>
          <h3 className='text-xl font-bold'>Open source contributions</h3>
          <OpenSourceList projects={openSourceProjects} />
        </div>
      </section>

      <section>
        <div className='flex flex-col gap-3'>
          <h3 className='text-xl font-bold'>Own projects</h3>
          <ul className='flex flex-col gap-4'>
            <li className='flex flex-col'>
              <Link
                href='https://github.com/officialaritro/reqlite'
                target='_blank'
                className='text-white underline hover:text-neutral-300 transition-colors w-fit'
              >
                reqlite
              </Link>
              <p className='text-neutral-400'>A lean, local-first API client written in Rust. No account, no cloud, no telemetry.</p>
            </li>
            {sideProjects.map((project) => (
              <li className='flex flex-col' key={project.slug}>
                <Link
                  href={project.githubLink ?? project.projLink}
                  target='_blank'
                  className='text-white underline hover:text-neutral-300 transition-colors w-fit'
                >
                  {project.title}
                </Link>
                <p className='text-neutral-400 break-words'>{project.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Wrapper>
  )
}

export default ProjectsPage
