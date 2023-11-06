import {
  IconArrowLeft,
  IconCheck,
  IconFile,
  IconGitCommit,
  IconMinus,
  IconPlayerPlayFilled,
  IconPlus,
  IconX,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import type { CheckRun, Commit } from '../../../pages/api/releases';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Code } from '../faq';

dayjs.extend(relativeTime);

export default function UpstreamCard({ commit, runs }: { commit: Commit; runs: CheckRun[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className='my-12 border border-gray-200 dark:border-gray-800 rounded-md p-4 transition-all ease-in-out cursor-pointer dark:hover:bg-gray-800/40'
      onClick={() => setOpen(!open)}
    >
      <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-row items-center space-x-4'>
          <div className='w-12 h-12 rounded-md bg-orange-200 items-center flex justify-center'>
            <IconGitCommit className='text-gray-700' size={24} />
          </div>
          <div>
            <Link
              className='font-semibold text-xl transition-all ease-in-out hover:underline dark:hover:text-gray-200'
              target='_blank'
              href={commit.html_url}
            >
              {commit.commit.message.split('\n')[0]}
            </Link>
            <div className='text-gray-500 dark:text-gray-400'>
              Comitted {dayjs(new Date(commit.commit.committer?.date ?? new Date('1/1/1969'))).fromNow()}
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
          className='mt-4'
        >
          <div className='text-gray-500 dark:text-gray-400 mb-6'>
            This is the most recent upstream commit, and may not be stable. If you encounter any bugs, make an
            issue on{' '}
            <Link href='https://github.com/diced/zipline/issues' className='text-blue-500 dark:text-blue-400'>
              GitHub
            </Link>
          </div>

          <div className='text-gray-500 dark:text-gray-400 mb-6'>
            This commit will be available under the <Code>ghcr.io/diced/zipline:trunk</Code> tag for Docker
            users once the <Code>Push Image to GitHub Packages</Code> action finishes.
          </div>

          <div className='flex flex-row items-center justify-between'>
            <div className='flex flex-row items-center space-x-4'>
              <div className='text-gray-500 dark:text-gray-400'>
                {(runs ?? []).map((run) => (
                  <div key={run.id} className='flex flex-col md:flex-row items-center space-x-2'>
                    <IconPlayerPlayFilled className='text-gray-500 dark:text-gray-400 mx-2' size={16} />
                    {run.name}

                    <span className='text-gray-400 dark:text-gray-500'>
                      {'('}
                      {run.status.replace('_', ' ')}{' '}
                      {run.status === 'completed' && (
                        <span>
                          {dayjs(run.completed_at ?? '1/1/1969').from(dayjs(run.started_at ?? null))}
                        </span>
                      )}
                      {run.status === 'in_progress' && (
                        <span>for {dayjs(run.started_at ?? '1/1/1969').toNow(true)}</span>
                      )}
                      {')'}
                    </span>

                    {run.conclusion === 'success' ? (
                      <IconCheck className='text-green-500 dark:text-green-400' size={16} />
                    ) : run.conclusion === 'failure' ? (
                      <IconX className='text-red-500 dark:text-red-400' size={16} />
                    ) : null}

                    {run.conclusion === 'success' ? (
                      <span className='text-green-500 dark:text-green-400'>Success </span>
                    ) : run.conclusion === 'failure' ? (
                      <span className='text-red-500 dark:text-red-400'>Failure</span>
                    ) : null}

                    <span className='text-gray-400 dark:text-gray-500'>
                      {run.completed_at ? dayjs(run.completed_at ?? '1/1/1969').fromNow() : ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='my-2' />

          <div className='flex flex-row items-center justify-between'>
            <div className='flex flex-row items-center space-x-4'>
              <div className='text-gray-500 dark:text-gray-400'>
                {(commit.files ?? []).map((file) => (
                  <div key={file.filename} className='flex flex-row items-center space-x-2'>
                    <IconFile className='text-gray-500 dark:text-gray-400 mx-2' size={16} />
                    {file.filename}
                    {file.previous_filename ? (
                      <span className='flex items-center text-gray-400 dark:text-gray-500'>
                        {' '}
                        <IconArrowLeft size='1rem' className='mr-2' /> {file.previous_filename}
                      </span>
                    ) : null}{' '}
                    <span className='text-gray-400 dark:text-gray-500'>({file.status})</span>
                    <span className='text-red-500 dark:text-red-400 flex items-center'>
                      {' '}
                      <IconPlus size='.8rem' /> {file.deletions.toLocaleString()}
                    </span>
                    <span className='text-green-500 dark:text-green-400 flex items-center'>
                      {' '}
                      <IconMinus size='.8rem' /> {file.additions.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
