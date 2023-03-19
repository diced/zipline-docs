import { IconArrowUp } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const offset = window.pageYOffset;
    setVisible(offset > 300);
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      className={`flex items-center justify-center fixed bottom-10 right-10 z-50 shadow-lg rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 transition-all ease-in-out duration-300 hover:scale-110 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClick}
    >
      <IconArrowUp className='m-2' />
    </button>
  );
}
