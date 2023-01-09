import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { Sun, Moon, DeviceLaptop, Icon } from 'tabler-icons-react';
import { randomStr } from '../lib/random';

const ICON_SIZE = 24;

const options = [
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'dark', label: 'Dark', Icon: Moon },
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
    <button
      key={randomStr()}
      className={`flex flex-row items-center mx-1 my-1 px-2 py-1 text-sm transition-colors text-gray-700 dark:text-gray-200 hover:bg-gray-50/40 dark:hover:bg-gray-800/50 rounded-md ${
        theme === value ? 'font-semibold text-blue-500 dark:text-blue-400' : ''
      }`}
      role='menuitem'
      onClick={onClick}
    >
      <span className='p-1 border border-gray-100 dark:border-gray-800 rounded-md shadow-sm'>
        <Icon size={16} />
      </span>
      <span className='ml-2 font-semibold'>{label}</span>
    </button>
  );
}

export default function ThemeDropdown({ withName = false }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [open, setOpen] = useState(false);
  const [resolvedTheme, setResolvedTheme] = useState(theme);
  const divEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (divEl.current && !divEl.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [divEl]);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (theme === 'system') {
      setResolvedTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    } else {
      setResolvedTheme(theme);
    }
  }, [theme, mounted]);

  useEffect(() => {
    if (theme === 'system') {
      const listener = (e: MediaQueryListEvent) => {
        setResolvedTheme(e.matches ? 'dark' : 'light');
      };

      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', listener);

      return () => {
        window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', listener);
      };
    }
  }, [theme, mounted]);

  if (!mounted) return null;

  return (
    <div className='relative'>
      <button
        className='mx-2 transition-all text-sm space-x-2 flex items-center justify-center px-2 text-gray-400 bg-none hover:text-blue-500'
        onClick={() => setOpen((o) => !o)}
      >
        {withName ? (
          <>
            <span className='capitalize'>{resolvedTheme}</span>
            {resolvedTheme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
          </>
        ) : resolvedTheme === 'light' ? (
          <Sun size={ICON_SIZE} />
        ) : (
          <Moon size={ICON_SIZE} />
        )}
      </button>
      {open && (
        <div
          ref={divEl}
          className={`absolute z-10 origin-top-right flex flex-col w-32 right-0 mt-2 rounded-md shadow-lg bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800 focus:outline-none ${
            withName ? 'bottom-6' : ''
          }`}
        >
          {options.map((option) => (
            <ThemeDropdownItem
              key={option.value}
              value={option.value}
              label={option.label}
              Icon={option.Icon}
              onClick={() => {
                setTheme(option.value);
                setOpen(false);
              }}
            />
          ))}

          <ThemeDropdownItem
            key='system'
            value='system'
            label='System'
            Icon={DeviceLaptop}
            onClick={() => {
              setTheme('system');
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
