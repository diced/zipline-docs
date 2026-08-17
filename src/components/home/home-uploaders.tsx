import Link from 'fumadocs-core/link';
import {
  Flame,
  Laptop,
  MonitorDot,
  Smartphone,
  TabletSmartphone,
  Terminal,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/cn';

type HomeUploader = {
  platform: string;
  name: string;
  description: React.ReactNode | string;
  href: string;
  icon: LucideIcon;
};

const uploaders: HomeUploader[] = [
  {
    platform: 'Windows',
    name: 'ShareX',
    description: (
      <>
        Generate a ready-to-use <span className='font-mono'>.sxcu</span> file from your dashboard and start
        uploading with one of the most popular Windows screenshot tools.
      </>
    ),
    href: '/docs/guides/uploaders/windows-sharex',
    icon: MonitorDot,
  },
  {
    platform: 'macOS',
    name: 'ishare',
    description: (
      <>
        Upload screenshots and screen recordings on macOS with ishare, using a Zipline-generated{' '}
        <span className='font-mono'>.iscu</span> file.
      </>
    ),
    href: '/docs/guides/uploaders/macos-ishare',
    icon: Laptop,
  },
  {
    platform: 'Linux',
    name: 'Flameshot',
    description: 'Capture screenshots with Flameshot and upload them straight to your Zipline instance.',
    href: '/docs/guides/uploaders/flameshot',
    icon: Flame,
  },
  {
    platform: 'iOS / macOS',
    name: 'Apple Shortcuts',
    description:
      'Install the official Zipline shortcut to upload files and shorten URLs from your iPhone, iPad, or Mac.',
    href: '/docs/guides/uploaders/ios-shortcuts',
    icon: Smartphone,
  },
  {
    platform: 'Android',
    name: 'xshare',
    description:
      'Use the xshare Android app with a Zipline-generated config to upload files from anywhere on your device.',
    href: '/docs/guides/uploaders/android-xshare',
    icon: TabletSmartphone,
  },
  {
    platform: 'Cross-platform',
    name: 'Shell Script',
    description:
      'Prefer the terminal? Generate a shell script that uploads any file or URL with a single command.',
    href: '/docs/guides/uploaders/shell-script',
    icon: Terminal,
  },
];

function UploaderCard({ platform, name, description, href, icon: Icon }: HomeUploader) {
  return (
    <Link
      href={href}
      className='group relative w-full grow rounded-md p-0 transition-all hover:-translate-y-1 hover:p-0.5 hover:shadow-2xl'
    >
      <div className='absolute inset-0 rounded-md bg-linear-to-r from-blue-100 to-blue-500 bg-size-[200%_200%] p-[10px] opacity-0 transition-opacity group-hover:animate-[gradient-spin_3s_linear_infinite] group-hover:opacity-100' />

      <div className='relative flex h-full flex-col rounded-md border border-fd-border bg-fd-card p-4 shadow-md'>
        <div className='flex items-center justify-between'>
          <Icon className='h-8 w-8 rounded-md bg-fd-muted p-1 text-fd-muted-foreground' />
          <span className='rounded-full border border-fd-border bg-fd-muted px-3 py-1 text-xs font-semibold text-fd-muted-foreground'>
            {platform}
          </span>
        </div>

        <span
          className={cn(
            'mt-4 flex items-center text-2xl font-bold transition-all md:text-3xl',
            'group-hover:underline group-hover:decoration-blue-500',
          )}
        >
          {name}
        </span>

        <p className='mt-2 grow text-lg text-fd-muted-foreground md:text-xl'>{description}</p>
      </div>
    </Link>
  );
}

export function HomeUploaders() {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
      {uploaders.map((uploader) => (
        <UploaderCard key={uploader.name} {...uploader} />
      ))}
    </div>
  );
}
