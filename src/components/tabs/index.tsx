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
      <div className='flex flex-row space-x-2'>
        {children.map((child: any) => (
          <button
            key={child.props.value}
            className={`${
              child.props.value === activeTab
                ? 'border-b-2 border-blue-400 bg-gray-100/40 dark:bg-gray-800'
                : ''
            } px-2 py-1 dark:text-white text-black rounded-md`}
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
