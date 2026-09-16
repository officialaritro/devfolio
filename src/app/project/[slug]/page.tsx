import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { sideProjects } from '@/lib/constants/side-projects';

import { ArrowLeft, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = sideProjects.find(p => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl py-12 px-4 text-white flex flex-col gap-6">
      <Link href="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors w-fit">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className='flex flex-col gap-3'>
        <h1 className="text-3xl font-bold">{project.title}</h1>

        {project.image && (
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover rounded-lg"
              priority={true}
            />
          </div>
        )}

        <p className="text-neutral-400">{project.desc}</p>

        <div className='flex flex-wrap items-center gap-3'>
          {project.githubLink ? (
            <>
              <Button asChild variant="outline" className='bg-zinc-800 border-none'>
                <a href={project.projLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className='h-4 w-4' />
                  Live
                </a>
              </Button>
              <Button asChild variant="outline" className='bg-zinc-800 border-none'>
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                  <FaGithub className='h-4 w-4' />
                  GitHub
                </a>
              </Button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://img.shields.io/github/stars/${new URL(project.githubLink).pathname.slice(1)}?style=flat-square&label=stars&color=27272a&labelColor=18181b`}
                alt={`GitHub stars for ${project.title}`}
                className='h-6'
              />
            </>
          ) : (
            <Button asChild variant="outline" className='bg-zinc-800 border-none'>
              <a href={project.projLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className='h-4 w-4' />
                View on GitHub/Demo
              </a>
            </Button>
          )}
        </div>
      </div>

      {project.deepDive && (
        <div className='flex flex-col gap-2 pt-2 border-t border-white/10'>
          <h2 className='text-lg font-bold'>{project.deepDive.heading}</h2>
          <p className='text-neutral-400'>{project.deepDive.body}</p>
        </div>
      )}
    </main>
  );
}
