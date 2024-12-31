import {
  Icon2fa,
  IconApi,
  IconApps,
  IconAppWindowFilled,
  IconBellRingingFilled,
  IconBrush,
  IconDeviceMobileFilled,
  IconFileSettings,
  IconFileUpload,
  IconFileZip,
  IconFolder,
  IconHttpPost,
  IconKey,
  IconLink,
  IconRocket,
  IconShare2,
  IconTagsFilled,
  IconUserExclamation,
  IconUsers,
  IconUserShare,
  IconVideo,
} from '@tabler/icons-react';
import HomeCard from './HomeCard';

const items: {
  title: string;
  description: string;
  href?: string;
  Icon: React.ComponentType;
}[] = [
  {
    title: 'Setup Quickly',
    description: 'Setup your own Zipline instance in minutes.',
    href: '/docs/get-started',
    Icon: IconRocket,
  },
  {
    title: 'Configure',
    description: 'Configure Zipline easily within the dashboard.',
    href: '/docs/config',
    Icon: IconFileSettings,
  },
  {
    title: 'Upload any file',
    description:
      'Upload images, videos, and more to Zipline, with extra support for syntax highlighting in text files.',
    href: '/docs/guides/upload-options',
    Icon: IconFileUpload,
  },
  {
    title: 'Folders',
    description: 'Organize your files with folders.',
    Icon: IconFolder,
  },
  {
    title: 'Tags',
    description: 'Tag your files for easy organization and searching.',
    Icon: IconTagsFilled,
  },
  {
    title: 'URL shortening',
    description: 'Shorten URLs with Zipline with custom links and more.',
    Icon: IconLink,
  },
  {
    title: 'Embeds',
    description:
      'Zipline generates embeds for files uploaded, making it possible to customize how they look in apps like Discord.',
    Icon: IconAppWindowFilled,
  },
  {
    title: 'Discord Webhooks',
    description:
      'Receive notifications in Discord when files are uploaded and URLs are shortened.',
    Icon: IconBellRingingFilled,
    href: '/docs/guides/discord-webhooks',
  },
  {
    title: 'HTTP Webhooks',
    description:
      'Need more than Discord? You can access all event data with HTTP webhooks.',
    Icon: IconHttpPost,
    href: '/docs/guides/http-webhooks',
  },
  {
    title: 'OAuth2',
    description:
      'Zipline supports Discord, GitHub, Google, and OIDC (any provider) for authentication.',
    Icon: IconUsers,
    href: '/docs/guides/oauth',
  },
  {
    title: '2FA',
    description: "Secure your users account's with Two-Factor Authentication.",
    Icon: Icon2fa,
  },
  {
    title: 'Passkeys',
    description: 'Passwordless authentication for your users.',
    Icon: IconDeviceMobileFilled,
  },
  {
    title: 'Password Protection',
    description: 'Protect your files and URLs with passwords.',
    Icon: IconKey,
  },
  {
    title: 'Image Compression',
    description: 'Compress your images on the fly to save space.',
    Icon: IconFileZip,
  },
  {
    title: 'Video Thumbnails',
    description:
      'Zipline will automatically generate thumbnails for your videos',
    Icon: IconVideo,
  },
  {
    title: 'API',
    description:
      'Zipline offers a fully featured API that allows for more fine-grained control over your instance.',
    Icon: IconApi,
  },
  {
    title: 'PWA',
    description:
      'When enabled, Zipline can be installed as a PWA on supported devices.',
    Icon: IconApps,
  },
  {
    title: 'Partial Uploads',
    description:
      'Zipline supports "chunking" your files when uploading large files.',
    Icon: IconShare2,
  },
  {
    title: 'Invites',
    description: 'Create invite links to share your instance with others.',
    Icon: IconUserShare,
  },
  {
    title: 'Quotas',
    description:
      'Set quotas on users to limit the amount of files they can upload.',
    Icon: IconUserExclamation,
  },
  {
    title: 'Custom Themes',
    description: 'Customize Zipline with your own themes.',
    Icon: IconBrush,
    href: '/docs/guides/themes',
  },
];

export default function HomePage() {
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {items.map((item) => (
          <HomeCard
            key={item.title}
            title={item.title}
            description={item.description}
            href={item.href}
            Icon={item.Icon}
          />
        ))}
      </div>
    </>
  );
}
