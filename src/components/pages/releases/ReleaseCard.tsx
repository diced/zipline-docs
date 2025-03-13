import { IconTag } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Release } from '../../../pages/api/releases';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import { Code } from '../faq';

dayjs.extend(relativeTime);

export default function ReleaseCard({
  release,
  latest,
}: {
  release: Release;
  latest?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className='my-12 border border-gray-100 dark:border-gray-800 rounded-md p-4 transition-all ease-in-out cursor-pointer dark:hover:bg-gray-800/40'
      onClick={() => setOpen(!open)}
    >
      <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-row items-center space-x-4'>
          <div className='w-12 h-12 rounded-md bg-green-200 dark:bg-green-200 items-center flex justify-center'>
            <IconTag className='text-gray-700' size={24} />
          </div>
          <div>
            <Link
              className='font-semibold text-xl transition-all ease-in-out hover:underline dark:hover:text-gray-200'
              target='_blank'
              href={release.html_url}
            >
              {release.tag_name}
            </Link>
            <div className='text-gray-500 dark:text-gray-400'>
              Released {dayjs(release.published_at ?? '1/1/1969').fromNow()}
            </div>
          </div>
        </div>
      </div>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.1 }}
        >
          <div className='text-gray-500 dark:text-gray-400 my-4'>
            This release is available under the{' '}
            {latest ? (
              <>
                <Code>ghcr.io/diced/zipline:latest</Code> and{' '}
                <Code>
                  ghcr.io/diced/zipline:{release.tag_name.replace('v', '')}
                </Code>
              </>
            ) : (
              <Code>ghcr.io/diced/zipline:{release.tag_name.replace('v', '')}</Code>
            )}{' '}
            tag{latest ? 's' : ''}.
          </div>

          <div className='prose dark:prose-invert dark:prose-li:text-white max-w-full my-4'>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {release.body ?? ''}
            </ReactMarkdown>
          </div>
        </motion.div>
      )}
    </div>
  );
}
