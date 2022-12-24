import { Alien, File, FileArrowRight, FileZip, Link, Lock, Rocket, Share, Users } from 'tabler-icons-react';
import DiscordIcon from '../../icons/DiscordIcon';
import HomeCard from './HomeCard';

const items = [
  {
    title: 'Setup Quickly',
    description: 'Setup your own Zipline instance in minutes.',
    href: '/docs/get-started',
    Icon: Rocket,
  },
  {
    title: 'Configure',
    description: 'Configure Zipline to your needs.',
    href: '/docs/config',
    Icon: File,
  },
  {
    title: 'Upload any file',
    description: 'Upload images and text to Zipline, with support for syntax highlighting in text files.',
    href: '/docs/guides/upload-options',
    Icon: FileArrowRight,
  },
  {
    title: 'URL Shortening',
    description: 'Shorten URLs with Zipline with vanities and maximum views.',
    href: '/docs/api/shorten',
    Icon: Link,
  },
  {
    title: 'Embeds',
    description: 'Have embeds for your uploads in Discord with OG tags.',
    href: '/docs/guides/upload-options',
    Icon: DiscordIcon,
  },
  {
    title: 'Notifications',
    description: 'Get notified when someone uploads to your instance.',
    href: '/docs/guides/discord-webhooks',
    Icon: DiscordIcon,
  },
  {
    title: 'OAuth2 Registration',
    description: 'Allow users to link and/or register with selected OAuth2 providers.',
    href: '/docs/guides/oauth',
    Icon: Users,
  },
  {
    title: '2FA',
    description: 'Enable 2FA for your users.',
    href: '/docs/guides/totp',
    Icon: Lock,
  },
  {
    title: 'Invites',
    description: 'Invite your friends to your instance!',
    Icon: Share,
  },
  {
    title: 'Password Protection',
    description: 'Protect your uploads with a password.',
    Icon: Lock,
  },
  {
    title: 'Image Compression',
    description: 'Compress your images to save space.',
    Icon: FileZip,
  },
  {
    title: 'Theres more!',
    description: "I didn't feel like listing everything here, so go check out the docs!",
    Icon: Alien,
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
