import Image from 'next/image';
import { Files, LayoutDashboard, LineChart, Link as LinkIcon, type LucideIcon } from 'lucide-react';
import type { StaticImageData } from 'next/image';

import homePageScreenshotDark from '@/../public/img/screenshot-1-dark.png';
import homePageScreenshotLight from '@/../public/img/screenshot-1-light.png';
import metricsPageScreenshotDark from '@/../public/img/screenshot-2-dark.png';
import metricsPageScreenshotLight from '@/../public/img/screenshot-2-light.png';
import galleryPageScreenshotDark from '@/../public/img/screenshot-3-dark.png';
import galleryPageScreenshotLight from '@/../public/img/screenshot-3-light.png';
import urlsPageScreenshotDark from '@/../public/img/screenshot-4-dark.png';
import urlsPageScreenshotLight from '@/../public/img/screenshot-4-light.png';
import foldersPageScreenshotDark from '@/../public/img/screenshot-5-dark.png';
import foldersPageScreenshotLight from '@/../public/img/screenshot-5-light.png';
import settingsPageScreenshotDark from '@/../public/img/screenshot-6-dark.png';
import settingsPageScreenshotLight from '@/../public/img/screenshot-6-light.png';
import { MacWindow } from './mac';

const SS_WIDTH = 2560;
const SS_HEIGHT = 1247;

export function EmphasizeText({ children }: { children: React.ReactNode }) {
  return (
    <span className='bg-linear-to-r from-blue-600 via-blue-400 to-blue-600 bg-size-[200%_200%] bg-clip-text text-transparent transition-all ease-in-out hover:animate-[gradient-spin_3s_linear_infinite]'>
      {children}
    </span>
  );
}

type ScreenshotSection = {
  id: string;
  darkImage: StaticImageData;
  lightImage: StaticImageData;
  alt: string;
  icon: LucideIcon;
  text: string;
};

const screenshotSections: ScreenshotSection[] = [
  {
    id: 'dashboard',
    darkImage: homePageScreenshotDark,
    lightImage: homePageScreenshotLight,
    alt: 'Home page screenshot',
    icon: LayoutDashboard,
    text: "Zipline's dashboard is packed with features, and is designed to be easy to use.",
  },
  {
    id: 'gallery',
    darkImage: galleryPageScreenshotDark,
    lightImage: galleryPageScreenshotLight,
    alt: 'Gallery page screenshot',
    icon: Files,
    text: 'View all your uploads in one place, and easily manage them.',
  },
  {
    id: 'metrics',
    darkImage: metricsPageScreenshotDark,
    lightImage: metricsPageScreenshotLight,
    alt: 'Metrics page screenshot',
    icon: LineChart,
    text: 'Track your uploads with historical data, and all stats related to your Zipline instance.',
  },
  {
    id: 'urls',
    darkImage: urlsPageScreenshotDark,
    lightImage: urlsPageScreenshotLight,
    alt: 'URLs page screenshot',
    icon: LinkIcon,
    text: 'View all your shortened URLs in one place, and easily manage them.',
  },
  {
    id: 'folders',
    darkImage: foldersPageScreenshotDark,
    lightImage: foldersPageScreenshotLight,
    alt: 'Folders page screenshot',
    icon: Files,
    text: 'Organize your files with folders, and easily manage them.',
  },
  {
    id: 'settings',
    darkImage: settingsPageScreenshotDark,
    lightImage: settingsPageScreenshotLight,
    alt: 'Settings page screenshot',
    icon: LayoutDashboard,
    text: 'Customize Zipline to your liking with a wide range of settings.',
  },
];

function ScreenshotTitle({ id }: { id: string }) {
  switch (id) {
    case 'dashboard':
      return (
        <>
          Zipline has an <EmphasizeText>amazing</EmphasizeText> dashboard
        </>
      );
    case 'gallery':
      return (
        <>
          Gallery to view all your <EmphasizeText>uploads</EmphasizeText>
        </>
      );
    case 'metrics':
      return (
        <>
          <EmphasizeText>Metrics</EmphasizeText> to track your uploads and more
        </>
      );
    case 'urls':
      return (
        <>
          View your <EmphasizeText>shortened URLs</EmphasizeText>
        </>
      );
    case 'folders':
      return (
        <>
          Organize your files with <EmphasizeText>folders</EmphasizeText>
        </>
      );
    case 'settings':
      return (
        <>
          <EmphasizeText>Customize</EmphasizeText> Zipline to your liking
        </>
      );
    default:
      return null;
  }
}

export function HomeScreenshots() {
  return (
    <div className='my-24 grid grid-cols-1 gap-12 gap-y-80 md:grid-cols-2'>
      {screenshotSections.map((section, i) => {
        const Icon = section.icon;
        const ImageComponent = (
          <MacWindow>
            <Image
              src={section.darkImage}
              width={SS_WIDTH}
              height={SS_HEIGHT}
              placeholder='blur'
              className='hidden dark:block'
              alt={section.alt}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
            <Image
              src={section.lightImage}
              width={SS_WIDTH}
              height={SS_HEIGHT}
              placeholder='blur'
              className='block dark:hidden'
              alt={section.alt}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </MacWindow>
        );

        const DescriptionPart = (
          <div className='flex flex-col justify-center'>
            <Icon className='my-2 h-10 w-10 rounded-lg bg-fd-muted p-2 text-fd-muted-foreground' />
            <div className='my-2 text-3xl font-bold'>
              <ScreenshotTitle id={section.id} />
            </div>
            <p className='my-4 text-xl text-fd-muted-foreground'>{section.text}</p>
          </div>
        );

        return (
          <div key={section.id} className='contents'>
            {i % 2 === 0 ? (
              <>
                {ImageComponent}
                {DescriptionPart}
              </>
            ) : (
              <>
                {DescriptionPart}
                {ImageComponent}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
