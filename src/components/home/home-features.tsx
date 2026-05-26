import Link from 'fumadocs-core/link';
import {
  AppWindow,
  Bell,
  Braces,
  FileArchive,
  Folder,
  Key,
  LayoutGrid,
  Link as LinkIcon,
  Paintbrush,
  Rocket,
  Settings,
  Share2,
  ShieldCheck,
  Smartphone,
  Tags,
  Upload,
  UserPlus,
  Users,
  UserX,
  Video,
  Webhook,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/cn';

type HomeFeature = {
  title: string;
  description: string;
  href?: string;
  icon: LucideIcon;
};

const homeFeatures: HomeFeature[] = [
  {
    title: 'Setup Quickly',
    description: 'Setup your own Zipline instance in minutes.',
    href: '/docs/get-started',
    icon: Rocket,
  },
  {
    title: 'Configure',
    description: 'Configure Zipline easily within the dashboard.',
    href: '/docs/config',
    icon: Settings,
  },
  {
    title: 'Upload any file',
    description:
      'Upload images, videos, and more to Zipline, with extra support for syntax highlighting in text files.',
    href: '/docs/guides/upload-options',
    icon: Upload,
  },
  {
    title: 'Folders',
    description: 'Organize your files with folders.',
    icon: Folder,
  },
  {
    title: 'Tags',
    description: 'Tag your files for easy organization and searching.',
    icon: Tags,
  },
  {
    title: 'URL shortening',
    description: 'Shorten URLs with Zipline with custom links and more.',
    icon: LinkIcon,
  },
  {
    title: 'Embeds',
    description:
      'Zipline generates embeds for files uploaded, making it possible to customize how they look in apps like Discord.',
    icon: AppWindow,
    href: '/docs/guides/view-routes#embeds',
  },
  {
    title: 'Discord Webhooks',
    description:
      'Receive notifications in Discord when files are uploaded and URLs are shortened.',
    icon: Bell,
    href: '/docs/guides/discord-webhooks',
  },
  {
    title: 'HTTP Webhooks',
    description:
      'Need more than Discord? You can access all event data with HTTP webhooks.',
    icon: Webhook,
    href: '/docs/guides/http-webhooks',
  },
  {
    title: 'OAuth2',
    description:
      'Zipline supports Discord, GitHub, Google, and OIDC (any provider) for authentication.',
    icon: Users,
    href: '/docs/guides/oauth',
  },
  {
    title: '2FA',
    description: "Secure your users account's with Two-Factor Authentication.",
    icon: ShieldCheck,
    href: '/docs/guides/2fa',
  },
  {
    title: 'Passkeys',
    description: 'Passwordless authentication for your users.',
    icon: Smartphone,
    href: '/docs/guides/passkeys',
  },
  {
    title: 'Password Protection',
    description: 'Protect your files and URLs with passwords.',
    icon: Key,
  },
  {
    title: 'Image Compression',
    description: 'Compress your images on the fly to save space.',
    icon: FileArchive,
    href: '/docs/guides/upload-options#image-compression',
  },
  {
    title: 'Video Thumbnails',
    description:
      'Zipline will automatically generate thumbnails for your videos',
    icon: Video,
    href: '/docs/guides/thumbnails',
  },
  {
    title: 'API',
    description:
      'Zipline offers a fully featured API for programmatic access to your instance.',
    icon: Braces,
    href: '/docs/api',
  },
  {
    title: 'PWA',
    description:
      'When enabled, Zipline can be installed as a PWA on supported devices.',
    icon: LayoutGrid,
  },
  {
    title: 'Partial Uploads',
    description:
      'Zipline supports "chunking" your files when uploading large files.',
    icon: Share2,
  },
  {
    title: 'Invites',
    description: 'Create invite links to share your instance with others.',
    icon: UserPlus,
  },
  {
    title: 'Quotas',
    description:
      'Set quotas on users to limit the amount of files they can upload.',
    icon: UserX,
  },
  {
    title: 'Custom Themes',
    description: 'Customize Zipline with your own themes.',
    icon: Paintbrush,
    href: '/docs/guides/themes',
  },
];

function FeatureCard({ title, description, href, icon: Icon }: HomeFeature) {
  const titleClassName = cn(
    'mt-4 flex items-center text-2xl font-bold transition-all md:text-3xl',
    href && 'hover:underline decoration-blue-500',
  );

  return (
    <div className='group relative w-full grow rounded-md p-0 transition-all hover:-translate-y-1 hover:p-0.5 hover:shadow-2xl'>
      <div className='absolute inset-0 rounded-md bg-linear-to-r from-blue-100 to-blue-500 bg-size-[200%_200%] p-[10px] opacity-0 transition-opacity group-hover:animate-[gradient-spin_3s_linear_infinite] group-hover:opacity-100' />

      <div className='relative h-full rounded-md border border-fd-border bg-fd-card p-4 shadow-md'>
        <Icon className='h-8 w-8 rounded-md bg-fd-muted p-1 text-fd-muted-foreground' />
        {href ? (
          <Link href={href} className={titleClassName}>
            {title}
          </Link>
        ) : (
          <span className={titleClassName}>{title}</span>
        )}
        <p className='mt-2 grow text-lg text-fd-muted-foreground md:text-xl'>
          {description}
        </p>
      </div>
    </div>
  );
}

export function HomeFeatures() {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
      {homeFeatures.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </div>
  );
}
