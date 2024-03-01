import { IconChevronDown } from '@tabler/icons-react';
import { useTheme } from 'next-themes';
import Highlight, { defaultProps } from 'prism-react-renderer';
import React, { useState } from 'react';
import ayuDark from '../lib/themes/ayuDark';
import ayuLight from '../lib/themes/ayuLight';

function bytesToHuman(value: number): string {
  if (isNaN(value)) return '0.0 B';
  if (value === Infinity) return '0.0 B';
  const units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB'];
  let num = 0;

  while (value > 1024) {
    value /= 1024;
    ++num;
  }

  return `${value.toFixed(1)} ${units[num]}`;
}

export type ParseValue = {
  file?: any;
  url?: any;
  user?: any;

  link?: string;
  raw_link?: string;
};

export function parseString(str: string, value: ParseValue) {
  str = str
    .replace(/\{link\}/gi, value.link ?? '')
    .replace(/\{raw_link\}/gi, value.raw_link ?? '')
    .replace(/\\n/g, '\n');

  const re = /\{(?<type>file|url|user)\.(?<prop>\w+)(::(?<mod>\w+))?\}/gi;
  let matches: RegExpMatchArray | null;

  while ((matches = re.exec(str))) {
    // @ts-ignore
    const getV = value[matches.groups?.type];
    if (!getV) {
      str = replaceCharsFromString(str, '{unknown_type}', matches.index, re.lastIndex);
      re.lastIndex = matches.index as number;
      continue;
    }

    if ((matches.groups?.prop ?? '') in ['password', 'avatar']) {
      str = replaceCharsFromString(str, '{unknown_property}', matches.index, re.lastIndex);
      re.lastIndex = matches.index as number;
      continue;
    }

    const v = getV[matches.groups?.prop ?? ''];

    if (v === undefined) {
      str = replaceCharsFromString(str, '{unknown_property}', matches.index, re.lastIndex);
      re.lastIndex = matches.index as number;
      continue;
    }

    if (matches.groups?.mod) {
      str = replaceCharsFromString(str, modifier(matches.groups?.mod ?? '', v), matches.index, re.lastIndex);
      re.lastIndex = matches.index as number;
      continue;
    }

    str = replaceCharsFromString(str, v, matches.index, re.lastIndex);
    re.lastIndex = matches.index as number;
  }

  return str;
}

function modifier(mod: string, value: any): string {
  mod = mod.toLowerCase();

  if (value instanceof Date) {
    switch (mod) {
      case 'locale':
        return value.toLocaleString();
      case 'time':
        return value.toLocaleTimeString();
      case 'date':
        return value.toLocaleDateString();
      case 'unix':
        return Math.floor(value.getTime() / 1000).toString();
      case 'iso':
        return value.toISOString();
      case 'utc':
        return value.toUTCString();
      case 'year':
        return value.getFullYear().toString();
      case 'month':
        return (value.getMonth() + 1).toString();
      case 'day':
        return value.getDate().toString();
      case 'hour':
        return value.getHours().toString();
      case 'minute':
        return value.getMinutes().toString();
      case 'second':
        return value.getSeconds().toString();
      default:
        return '{unknown_date_modifier}';
    }
  } else if (typeof value === 'string') {
    switch (mod) {
      case 'upper':
        return value.toUpperCase();
      case 'lower':
        return value.toLowerCase();
      case 'title':
        return value.charAt(0).toUpperCase() + value.slice(1);
      case 'length':
        return value.length.toString();
      case 'reverse':
        return value.split('').reverse().join('');
      case 'base64':
        return btoa(value);
      case 'hex':
        return toHex(value);
      default:
        return '{unknown_str_modifier}';
    }
  } else if (typeof value === 'number') {
    switch (mod) {
      case 'comma':
        return value.toLocaleString();
      case 'hex':
        return value.toString(16);
      case 'octal':
        return value.toString(8);
      case 'binary':
        return value.toString(2);
      case 'bytes':
        return bytesToHuman(value);
      default:
        return '{unknown_int_modifier}';
    }
  } else if (typeof value === 'boolean') {
    switch (mod) {
      case 'yesno':
        return value ? 'Yes' : 'No';
      case 'onoff':
        return value ? 'On' : 'Off';
      case 'truefalse':
        return value ? 'True' : 'False';
      default:
        return '{unknown_bool_modifier}';
    }
  }

  return '{unknown_modifier}';
}

function replaceCharsFromString(
  str: string,
  replace: string,
  start: number | undefined,
  end: number,
): string {
  return str.slice(0, start) + replace + str.slice(end);
}

function toHex(str: string): string {
  let hex = '';
  for (let i = 0; i < str.length; i++) {
    hex += '' + str.charCodeAt(i).toString(16);
  }
  return hex;
}

export default function Playground() {
  const [value, setValue] = useState(
    '{user.username} ({file.id}) uploaded {file.name} ({file.size::bytes}) (original name: {file.originalName}) at {file.createdAt::hour}:{file.createdAt::minute} today',
  );
  const [dataOpen, setDataOpen] = useState(false);

  const { theme } = useTheme();

  const sampleData = {
    user: {
      administrator: true,
      id: 1,
      username: 'administrator',
      token: 'qwertyuiopasdfghjkzxcvbnm',
      superAdmin: true,
      systemTheme: 'default',
      ratelimit: new Date(),
      totpSecret: '1234567890',
      domains: [],
    },
    file: {
      id: 1,
      mimetype: 'image/png',
      name: 'test.png',
      originalName: 'originalNameWow.png',
      createdAt: new Date(),
      expiresAt: new Date(new Date().getTime() + 20 * 60 * 1000),
      maxViews: 100,
      views: 2,
      favorite: true,
      embed: true,
      format: 'RANDOM',
      userId: 1,
      size: 12456789,
    },
    url: {
      id: 2,
      destination: 'https://google.com',
      vanity: 'google',
      createdAt: new Date(),
      maxViews: 100,
      views: 2,
      userId: 1,
    },
    link: 'https://example.com/u/test.png',
    raw_link: 'https://example.com/r/test.png',
  };

  const [parsed, setParsed] = useState(parseString(value, sampleData));

  const handle = (event: any) => {
    setValue(event.target.value);
    setParsed(parseString(event.target.value, sampleData));
  };

  return (
    <>
      <input
        className='focus:ring-1 focus:ring-blue-500 focus:outline-none appearance-none w-full text-md leading-6 text-gray-800 dark:text-gray-200 placeholder-slate-400 rounded-md p-2 ring-1 ring-gray-50 dark:ring-gray-700 shadow-sm'
        type='text'
        aria-label='Type out your string here with variables!'
        placeholder='Type out your string here with variables!'
        value={value}
        onChange={handle}
      />

      <div
        className={`dark:bg-gray-800 border border-gray-50 dark:border-gray-700 rounded-md p-2 my-2 transition-colors ${
          parsed.trim().length === 0 ? 'text-gray-200' : 'text-black dark:text-white'
        }`}
        style={{ whiteSpace: 'pre-wrap' }}
      >
        {parsed.trim().length === 0 ? 'Type something!' : parsed}
      </div>

      <div className='flex-col items-center justify-between mb-12'>
        <button className='flex items-center space-x-2 p-1 rounded-md' onClick={() => setDataOpen(!dataOpen)}>
          <span className='text-gray-200 dark:text-gray-500'>View Sample Data</span>

          <IconChevronDown
            className={`w-5 h-5 text-gray-200 dark:text-gray-500 transition-transform transform ${
              dataOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        <div className={`overflow-auto transition-all ${dataOpen ? 'max-h-[100rem]' : 'max-h-0'}`}>
          <Highlight
            {...defaultProps}
            code={JSON.stringify(sampleData, null, 2)}
            language='json'
            theme={theme === 'light' ? ayuLight : ayuDark}
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={`${className} shadow-md`} style={style}>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
      </div>
    </>
  );
}
