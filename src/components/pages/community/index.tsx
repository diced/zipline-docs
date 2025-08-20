import {
  IconBrandAndroid,
  IconBrandDiscordFilled,
  IconBrandGithubFilled,
  IconBrandPython,
  IconCirclePlusFilled,
} from '@tabler/icons-react';
import CommunityCard, { Link as CommunityLink } from './CommunityCard';
import CommunityProject, { Project } from './CommunityProject';

import Link from 'next/link';
import midnightNeonGreen from '../../../../public/img/themes/midnight-neon-green.png';
import CommunityTheme, { Theme } from './CommunityTheme';

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

/* for PRS:
  when adding new themes here, make sure the following is true:
  - the theme has a unique name
  - an author href is provided
    - if you submit prs with a link to something other than a personal profile it will be rejected
  - the theme json is unformatted like the below one
  - you included a screenshot of the theme in the public/img/themes folder
    - when taking this screenshot the browser UI should not be visible
    - on *windows* this can be done using sharex
    - on *mac* this can be done using the built in screenshot tool then editing the screenshot to remove rounded corners
    - on *linux* this can be done using any screenshot tool, then editing the screenshot to remove unwanted UI

  ! if you are unsure, just use the midnight neon green as a template !
*/
const themes: Theme[] = [
  {
    name: 'Midnight Neon Green',
    description: 'A modern dark theme with neon green accents.',
    author: 'diced',
    authorHref: 'https://github.com/diced',
    image: midnightNeonGreen,
    json: '{"name":"test","id":"test","colorScheme":"dark","colors":{"green":["#e5ff99","#dfff80","#d9ff66","#d2ff4d","#bfff00","#ace600","#99cc00","#86b300","#739900","#4c6600"],"dark":["#FFFFFF","#999999","#a8a8a8","#666666","#282828","#181818","#151515","#111111","#181818","#00001E"]},"primaryColor":"green","mainBackgroundColor":"#0a0a0a"}',
  },
];

/* for PRS:
  when adding new projects here, make sure the following is true:
  - the project has a unique name
  - an author href is provided
    - if you submit prs with a link to something other than a personal profile it will be rejected
  - the project has a description
  - the project has a link to the project
  - the project has an icon or image preferable remote hosted, we will not add images to this repo
  - the project is related to Zipline in some way (e.g. an app, library, etc..)
  - the project is not a theme, themes should be added to the themes array above
*/
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
      'An Android app to manage your self-hosted Zipline V4 instance.',
    href: 'https://github.com/Stef-00012/Zipline-Android-App',
    authorHref: 'https://github.com/Stef-00012',
    author: 'Stef-00012',
    image:
      'https://raw.githubusercontent.com/Stef-00012/Zipline-Android-App/refs/heads/main/assets/images/icon.png',
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
      <div
        id='community'
        className='grid grid-cols-1 md:grid-cols-2 gap-4 my-36 mx-12 md:mx-72'
      >
        {links.map((link, i) => (
          <CommunityCard key={i} link={link} />
        ))}
      </div>

      <h2 className='text-4xl font-extrabold text-center' id='themes'>
        Themes
      </h2>
      <p className='text-center text-xl mt-4'>
        Check out these custom themes made by the community!
      </p>
      <p className='text-center text-sm mt-2'>
        Want to create your own theme for Zipline? Visit the{' '}
        <Link
          href='/docs/guides/themes'
          className='underline decoration-blue-400'
        >
          themes guide
        </Link>{' '}
        to learn how to create and install your own themes! If you want to add a
        theme to this list, please make a PR or reach out on Discord.
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-36 mb-72 mx-12'>
        {themes.map((theme) => (
          <CommunityTheme key={theme.name} theme={theme} />
        ))}
      </div>

      <h2 className='text-4xl font-extrabold text-center' id='showcase'>
        Showcase
      </h2>
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
