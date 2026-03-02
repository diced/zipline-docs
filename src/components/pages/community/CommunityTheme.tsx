import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import Image, { StaticImageData } from 'next/image';
import { useCallback, useState } from 'react';
import Pre from '../../mdx/Pre';

export type Theme = {
  name: string;
  description: string;
  author: string;
  authorHref: string;
  image: StaticImageData | string;
  json: string;
};

function CommunityThemeModal({
  open,
  onClose,
  theme,
}: {
  open: boolean;
  onClose: () => void;
  theme: Theme;
}) {
  const [showFull, setShowFull] = useState(false);

  const themeName = theme.name.replace(/\s+/g, '-').toLowerCase();

  const downloadTheme = useCallback(() => {
    const blob = new Blob([JSON.stringify(JSON.parse(theme.json), null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${themeName}.theme.json`;
    a.click();

    URL.revokeObjectURL(url);
  }, [theme]);

  return (
    <Dialog open={open} onClose={onClose} className='relative z-50'>
      <div className='fixed inset-0 w-screen overflow-y-auto p-4 backdrop-blur-sm bg-black/30'>
        <div className='flex min-h-full items-center justify-center'>
          <DialogPanel className='max-w-4xl space-y-4 border border-gray-100 dark:border-gray-800 rounded-md p-6 bg-white dark:bg-gray-900'>
            <div className='flex items-center justify-between'>
              <DialogTitle className='font-bold font-mono text-2xl'>
                {theme.name}
              </DialogTitle>
              <button
                onClick={onClose}
                aria-label='Close'
                className='text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-xl font-bold px-2'
              >
                ×
              </button>
            </div>
            <Image
              src={theme.image}
              alt={`${theme.name} Theme`}
              className='rounded-md border border-gray-100 dark:border-gray-800'
            />

            <span className='text-sm text-gray-500 dark:text-gray-400'>
              Created by{' '}
              <a
                href={theme.authorHref}
                className='underline hover:text-blue-500 dark:hover:text-blue-400'
                target='_blank'
                rel='noopener noreferrer'
              >
                {theme.author}
              </a>
            </span>

            <p>{theme.description}</p>

            <div>
              <div className='relative'>
                <Pre
                  className='language-json p-2 rounded-md'
                  copy={showFull}
                  code={
                    showFull
                      ? JSON.stringify(JSON.parse(theme.json), null, 2)
                      : (() => {
                          const fmt = JSON.stringify(
                            JSON.parse(theme.json),
                            null,
                            2,
                          );
                          return fmt.length > 140
                            ? fmt.slice(0, 140) + '\n'
                            : fmt;
                        })()
                  }
                />
                <button
                  className='absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-md border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-mono z-10'
                  onClick={() => setShowFull((prev) => !prev)}
                >
                  {showFull ? 'Hide' : 'Click to show more'}
                </button>

                {!showFull && (
                  <div className='absolute inset-0 bg-linear-to-b from-transparent to-white dark:to-gray-900 pointer-events-none rounded-md' />
                )}
              </div>
            </div>

            <div className='text-sm text-gray-500 dark:text-gray-400'>
              <h4 className='font-bold'>How to install this theme:</h4>
              <ol className='list-decimal pl-6 space-y-2'>
                <li>
                  Download the theme file using the button below or copy the
                  above contents into a file.
                </li>
                <li>
                  Place the downloaded{' '}
                  <span className='font-mono'>theme.json</span> file in your
                  Zipline themes directory (a directory called
                  &quot;themes&quot; in the root directory of Zipline).
                </li>
                <li>
                  Note that Zipline will only pick up themes that have
                  <b>&quot;.theme.json&quot;</b> in their filename.
                </li>
                <li>
                  Themes are dynamically loaded, so you can just refresh any
                  Zipline page open
                </li>
                <li>
                  Visit the user settings page, and find &quot;{theme.name}
                  &quot; in the dropdown.
                </li>
              </ol>
            </div>

            <div className='flex gap-4'>
              <button
                className='px-3 py-1 rounded-md border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-mono z-10'
                onClick={downloadTheme}
              >
                Download{' '}
                <span className='font-mono'>{themeName}.theme.json</span>
              </button>

              <button
                className='px-3 py-1 rounded-md border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-mono z-10'
                onClick={onClose}
              >
                × Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default function CommunityTheme({ theme }: { theme: Theme }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className='border border-gray-100 dark:border-gray-800 rounded-md shadow-md hover:shadow-2xl flex flex-col cursor-pointer hover:scale-105 transition-transform duration-200'
        onClick={() => setOpen(true)}
      >
        <Image
          src={theme.image}
          alt={`${theme.name} Theme`}
          className='rounded-t-md border-b border-gray-100 dark:border-gray-800'
        />

        <h3 className='text-xl font-semibold p-4 font-mono'>{theme.name}</h3>
      </div>

      <CommunityThemeModal
        open={open}
        onClose={() => setOpen(false)}
        theme={theme}
      />
    </>
  );
}
