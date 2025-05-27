import ApiBadge from './ApiBadge';
import { Heading } from './Headings';

export default function ApiHeading({
  type,
  children,
}: {
  type: string;
  children: React.ReactNode;
}) {
  return (
    <Heading
      level={2}
      id={`${type.toLowerCase()}-${children!.toString().toLowerCase().replace(/\s+/g, '-')}`}
    >
      <ApiBadge type={type} /> {children}
    </Heading>
  );
}
