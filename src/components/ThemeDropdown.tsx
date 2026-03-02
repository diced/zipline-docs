import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
  Icon,
  IconDevices,
  IconMoonFilled,
  IconSunFilled,
} from '@tabler/icons-react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ICON_SIZE = 24;

const options = [
  { value: 'light', label: 'Light', Icon: IconSunFilled },
  { value: 'dark', label: 'Dark', Icon: IconMoonFilled },
  { value: 'system', label: 'System', Icon: IconDevices },
];

export function ThemeDropdownItem({
  value,
  onClick,
  Icon,
  label,
}: {
  value: string;
  label: string;
  Icon: Icon;
  onClick: () => any;
}) {
  const { theme } = useTheme();

  return (
    <MenuItem
      as='button'
      className={clsx(
        'flex flex-row items-center mx-1 my-1 px-2 py-1 text-sm transition-colors text-gray-700 dark:text-gray-200 hover:bg-gray-50/40 dark:hover:bg-gray-800/50 rounded-md',
        theme === value && 'font-semibold text-blue-500 dark:text-blue-400',
      )}
      onClick={onClick}
      data-umami-event='theme_dropdown'
      data-umami-event-theme={value}
    >
      <span className='p-1 border border-gray-100 dark:border-gray-800 rounded-md shadow-xs'>
        <Icon size={16} />
      </span>
      <span className='ml-2 font-semibold'>{label}</span>
    </MenuItem>
  );
}

export default function ThemeDropdown() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [resolvedTheme, setResolvedTheme] = useState(theme);

  const addDataTheme = (theme: string | undefined) => {
    if (document.documentElement) {
      document.documentElement.setAttribute(
        'data-theme',
        (theme as string) || '',
      );
    }
  };

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (theme === 'system') {
      setResolvedTheme(
        window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light',
      );
      addDataTheme(
        window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light',
      );
    } else {
      setResolvedTheme(theme);
      addDataTheme(theme);
    }
  }, [theme, mounted]);

  useEffect(() => {
    if (theme === 'system') {
      const listener = (e: MediaQueryListEvent) => {
        setResolvedTheme(e.matches ? 'dark' : 'light');
      };

      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', listener);

      return () => {
        window
          .matchMedia('(prefers-color-scheme: dark)')
          .removeEventListener('change', listener);
      };
    }
  }, [theme, mounted]);

  if (!mounted) return null;

  return (
    <Menu>
      <MenuButton className='mx-2 transition-all text-sm space-x-2 flex items-center justify-center px-2 text-gray-400 bg-none hover:text-blue-500'>
        {resolvedTheme === 'light' ? (
          <IconSunFilled size={ICON_SIZE} />
        ) : (
          <IconMoonFilled size={ICON_SIZE} />
        )}
      </MenuButton>

      <MenuItems
        anchor='bottom end'
        className='absolute z-400 origin-top-right flex flex-col w-32 right-0 mt-2 rounded-md shadow-lg bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800 focus:outline-hidden'
      >
        {options.map((option) => (
          <ThemeDropdownItem
            key={option.value}
            value={option.value}
            label={option.label}
            Icon={option.Icon}
            onClick={() => {
              setTheme(option.value);
            }}
          />
        ))}
      </MenuItems>
    </Menu>
  );
}
