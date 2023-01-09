import { ReactElement, useState } from 'react';

interface TabsProps {
  defaultValue: string;
  children: ReactElement[];
}

export default function Tabs({ defaultValue, children }: TabsProps) {
  const defaultTab = children.find((child: any) => child.props.default || child.props.value === defaultValue);

  const [activeTab, setActiveTab] = useState(defaultTab?.props.value);

  return (
    <div className='prose'>
      <div className='flex flex-row'>
        {children.map((child: any) => (
          <button
            key={child.props.value}
            className={`${
              child.props.value === activeTab ? 'border-blue-400' : 'border-gray-200 dark:border-gray-800'
            } border-b px-2 py-1 dark:text-white text-black transition-all`}
            onClick={() => setActiveTab(child.props.value)}
          >
            {child.props.label ?? child.props.value}
          </button>
        ))}
      </div>
      {children.map((child: any) => {
        return (
          <div key={child.props.value} className={`${child.props.value === activeTab ? '' : 'hidden'}`}>
            {child}
          </div>
        );
      })}
    </div>
  );
}
