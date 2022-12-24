import DiscordIcon from '../../icons/DiscordIcon';
import GithubIcon from '../../icons/GithubIcon';
import CommunityCard from './CommunityCard';

const communities = [
  {
    name: 'GitHub',
    description: 'The official GitHub repository for the project.',
    href: '/github',
    icon: GithubIcon,
  },
  {
    name: 'Discord',
    description: 'The official Discord server for the project. Receive help, or just chat around with us!',
    href: '/discord',
    icon: DiscordIcon,
  },
];

export default function CommunityPage() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-36 mx-12 md:mx-72' id='features'>
      {communities.map((community) => (
        <CommunityCard
          key={community.name}
          title={community.name}
          description={community.description}
          Icon={community.icon}
          href={community.href}
        />
      ))}
    </div>
  );
}
