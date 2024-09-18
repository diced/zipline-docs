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
