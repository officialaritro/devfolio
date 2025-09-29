import { notFound } from 'next/navigation';
import { sideProjects } from '@/lib/constants/side-projects';
import Link from 'next/link';
import Image from 'next/image';

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = sideProjects.find(p => p.slug === slug);

  if (!project) {
    notFound();  // Built-in 404 if no match
  }

  return (
    <main className="mx-auto max-w-3xl py-12 px-4 text-white">
      <Link href="/" className="text-blue-500 hover:underline">← Back to Home</Link>
      <h1 className="text-3xl font-bold mt-6">{project.title}</h1>
      {project.image && (
        <div className="mt-4 relative w-full h-64 md:h-96">  // Responsive container
          <Image 
            src={project.image} 
            alt={project.title} 
            fill  // Fills container
            className="object-cover rounded-lg" 
            priority={true}  
          />
        </div>
      )}
      <p className="mt-4 text-lg">{project.desc}</p>
      <a href={project.projLink} className="mt-4 inline-block bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700" target="_blank" rel="noopener noreferrer">
        View on GitHub/Demo
      </a>
      {/* Extend with more details, e.g., tech stack or screenshots */}
    </main>
  );
}