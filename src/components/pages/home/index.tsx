import {
  Icon2fa,
  IconAlienFilled,
  IconApi,
  IconAppWindowFilled,
  IconBellRingingFilled,
  IconFileSettings,
  IconFileUpload,
  IconFileZip,
  IconFolder,
  IconKey,
  IconLink,
  IconRocket,
  IconShare2,
  IconUsers,
  IconVideo,
} from '@tabler/icons-react';
import HomeCard from './HomeCard';

const items = [
  {
    title: 'Setup Quickly',
    description: 'Setup your own Zipline instance in minutes.',
    href: '/docs/get-started',
    Icon: IconRocket,
  },
  {
    title: 'Configure',
    description: 'Configure Zipline to your needs.',
    href: '/docs/config',
    Icon: IconFileSettings,
  },
  {
    title: 'Upload any file',
    description: 'Upload images and text to Zipline, with support for syntax highlighting in text files.',
    href: '/docs/guides/upload-options',
    Icon: IconFileUpload,
  },
  {
    title: 'Folders',
    description: 'Organize your uploads with folders.',
    Icon: IconFolder,
  },
  {
    title: 'URL Shortening',
    description: 'Shorten URLs with Zipline with vanities and maximum views.',
    href: '/docs/api/shorten',
    Icon: IconLink,
  },
  {
    title: 'Embeds',
    description: 'Have embeds for your uploads in Discord with OG tags.',
    href: '/docs/guides/upload-options',
    Icon: IconAppWindowFilled,
  },
  {
    title: 'Notifications',
    description: 'Get notified when someone uploads to your instance.',
    href: '/docs/guides/discord-webhooks',
    Icon: IconBellRingingFilled,
  },
  {
    title: 'OAuth2 Registration',
    description: 'Allow users to link and/or register with selected OAuth2 providers.',
    href: '/docs/guides/oauth',
    Icon: IconUsers,
  },
  {
    title: '2FA',
    description: 'Enable 2FA for your users.',
    href: '/docs/guides/totp',
    Icon: Icon2fa,
  },
  {
    title: 'Invites',
    description: 'Invite your friends to your instance!',
    Icon: IconShare2,
  },
  {
    title: 'Password Protection',
    description: 'Protect your uploads with a password.',
    Icon: IconKey,
  },
  {
    title: 'Image Compression',
    description: 'Compress your images to save space.',
    Icon: IconFileZip,
  },
  {
    title: 'Video Thumbnails',
    description: 'Zipline will automatically generate thumbnails for your videos.',
    Icon: IconVideo,
  },
  {
    title: 'API',
    description: 'Zipline offers an extensive API for a more fine-grained control over your instance.',
    href: '/docs/api',
    Icon: IconApi,
  },
  {
    title: 'Theres more!',
    description: "I didn't feel like listing everything here, so go check out the docs!",
    Icon: IconAlienFilled,
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
