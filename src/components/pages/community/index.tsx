import {
  IconBrandAndroid,
  IconBrandDiscordFilled,
  IconBrandGithubFilled,
  IconBrandPython,
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
  {
    name: 'Zipline Upload Extension',
    description:
      'Zipline Uploads allow you to upload your right clicked files or shorten your right clicked URLs to your selfhosted instance of Zipline without having to download the file to your PC and upload it manually.',
    href: 'https://github.com/Stef-00012/Zipline-Upload-Extension',
    authorHref: 'https://github.com/Stef-00012',
    author: 'Stef-00012',
    image:
      'https://raw.githubusercontent.com/Stef-00012/Zipline-Upload-Extension/refs/heads/main/src/icons/128.png',
  },
  {
    name: 'Zipline Android App',
    description:
      'An Android app to manage your self-hosted zipline V4 instance.',
    href: 'https://github.com/Stef-00012/Zipline-Android-App',
    authorHref: 'https://github.com/Stef-00012',
    author: 'Stef-00012',
    Icon: IconBrandAndroid,
  },
  {
    name: 'zipline.py',
    description: 'An asynchronous wrapper for the Zipline v4 API in Python',
    href: 'https://github.com/fretgfr/zipline.py',
    authorHref: 'https://github.com/fretgfr',
    author: 'fretgfr',
    Icon: IconBrandPython,
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
