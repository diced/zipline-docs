import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'tabler-icons-react';

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      className='mx-2 transition-all flex items-center justify-center w-8 h-8 rounded-full text-gray-400 bg-none hover:bg-gray-100 dark:hover:bg-gray-700'
      onClick={() => {
        setTheme(theme === 'light' ? 'dark' : 'light');
      }}
    >
      {theme === 'light' ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
}
