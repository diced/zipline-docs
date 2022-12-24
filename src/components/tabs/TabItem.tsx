import { ReactNode } from 'react';

interface TabItemProps {
  value: string;
  default?: boolean;
  children: ReactNode;
}

export default function TabItem({ children }: TabItemProps) {
  return <div>{children}</div>;
}
