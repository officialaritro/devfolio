import AboutMeSection from '@/components/home/about-me';
import ExperienceSection from '@/components/home/experience';
import OpenSourceContributionSection from '@/components/home/open-source-contribution';
import SideProjectsSection from '@/components/home/side-projects';
import Wrapper from '@/components/wrapper';

export default function Home() {
  return (
    <Wrapper>
      <AboutMeSection />
      <ExperienceSection />
      <SideProjectsSection />
      <OpenSourceContributionSection />
    </Wrapper>
  );
}
