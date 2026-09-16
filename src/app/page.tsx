import { Suspense } from 'react';
import AboutMeSection from '@/components/home/about-me';
import ExperienceSection from '@/components/home/experience';
import GithubCalendar from '@/components/home/github-calendar';
import ImpactSection from '@/components/home/impact';
import SideProjectsSection from '@/components/home/side-projects';
import SkillsSection from '@/components/home/skills';
import Wrapper from '@/components/wrapper';

function GithubCalendarSkeleton() {
  return (
    <section>
      <div className='flex flex-col gap-3'>
        <div className='h-6 w-36 bg-white/5 rounded animate-pulse' />
        <div className='h-4 w-52 bg-white/5 rounded animate-pulse' />
        <div className='h-[110px] w-full bg-white/5 rounded animate-pulse' />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Wrapper>
      <AboutMeSection />
      <Suspense fallback={<GithubCalendarSkeleton />}>
        <GithubCalendar username="officialaritro" />
      </Suspense>
      <SkillsSection />
      <ExperienceSection />
      <SideProjectsSection />
      <ImpactSection />
    </Wrapper>
  );
}
