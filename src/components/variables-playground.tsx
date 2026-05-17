'use client';

import { useEffect, useState } from 'react';
import { parseString } from '@/lib/parser';
import sampleData from '@/lib/parser/sample';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

export default function Playground() {
  const [date, setDate] = useState(new Date('1/1/2025 11:30 am'));
  const data = sampleData(date);

  const [value, setValue] = useState(
    '{user.username} ({file.id}) uploaded {file.name} ({file.size::bytes}) (original name: {file.originalName}) at {file.createdAt::hour}:{file.createdAt::minute} today',
  );

  const [dataOpen, setDataOpen] = useState(false);
  const [parsed, setParsed] = useState(parseString(value, data));

  const handle = (event: any) => {
    setValue(event.target.value);
    setParsed(parseString(event.target.value, data));
  };

  useEffect(() => {
    setDate(new Date());
  }, []);

  return (
    <>
      <input
        className='focus:ring-1 focus:ring-blue-500 focus:outline-hidden appearance-none w-full text-md leading-6 text-gray-800 dark:text-gray-200 placeholder-slate-400 rounded-md p-2 ring-1 ring-gray-50 dark:ring-gray-700 shadow-xs'
        type='text'
        aria-label='Type out your string here with variables!'
        placeholder='Type out your string here with variables!'
        value={value}
        onChange={handle}
      />

      <div
        className={cn(
          'dark:bg-gray-800 border border-gray-50 dark:border-gray-700 rounded-md p-2 my-2 transition-colors',
          parsed?.trim().length === 0
            ? 'text-gray-200'
            : 'text-black dark:text-white',
        )}
        style={{ whiteSpace: 'pre-wrap' }}
      >
        {parsed?.trim().length === 0 ? 'Type something!' : parsed}
      </div>

      <div className='flex-col items-center justify-between mb-12'>
        <button
          className='flex items-center space-x-2 p-1 rounded-md'
          onClick={() => setDataOpen(!dataOpen)}
        >
          <span className='text-gray-200 dark:text-gray-500'>
            View Sample Data
          </span>

          <ChevronDown
            className={cn(
              'w-5 h-5 text-gray-200 dark:text-gray-500 transition-transform transform',
              dataOpen && 'rotate-180',
            )}
          />
        </button>

        <div
          className={cn(
            'overflow-auto transition-all max-h-0',
            dataOpen && 'max-h-400',
          )}
        >
          <DynamicCodeBlock
            code={JSON.stringify(data, null, 2)}
            lang='json'
            codeblock={{
              title: 'Sample Data',
            }}
          />
        </div>
      </div>
    </>
  );
}
