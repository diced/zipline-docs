import {
  IconBrandDiscordFilled,
  IconBrandGithubFilled,
  IconCirclePlusFilled,
} from '@tabler/icons-react';
import CommunityCard, { Link as CommunityLink } from './CommunityCard';
import CommunityProject, { Project } from './CommunityProject';

const links: CommunityLink[] = [
  {
    name: 'GitHub',
    description: 'The official GitHub repository for the project.',
    href: '/github',
    Icon: IconBrandGithubFilled,
  },
  {
    name: 'Discord',
    description:
      'The official Discord server for the project. Receive help, or just chat around with us!',
    href: '/discord',
    Icon: IconBrandDiscordFilled,
  },
];

const projects: Project[] = [
  {
    name: 'Add yours!',
    description:
      'Made something cool with Zipline? Make a pull request or reach out on Discord and we will add it here!',
    href: '/github',
    authorHref: '/discord',
    author: 'you',
    Icon: IconCirclePlusFilled,
  },
];

export default function CommunityPage() {
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-36 mx-12 md:mx-72'>
        {links.map((link, i) => (
          <CommunityCard key={i} link={link} />
        ))}
      </div>

      <h2 className='text-4xl font-extrabold text-center'>Showcase</h2>
      <p className='text-center text-xl mt-4'>
        Check out these Zipline-related projects!
      </p>

      <div className='flex flex-col gap-4 my-36 mx-12'>
        {projects.map((project) => (
          <CommunityProject key={project.name} project={project} />
        ))}
      </div>
    </>
  );
}
