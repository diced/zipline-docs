import { IconX } from '@tabler/icons-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Highlight, { Prism } from 'prism-react-renderer';
import { useState, useEffect } from 'react';
import ayuDark from '../lib/themes/ayuDark';
import ayuLight from '../lib/themes/ayuLight';
import Alert from './Alert';
import APIBadge from './APIBadge';
import ExternalLinksBuilder from './ExternalLinksBuilder';
import Playground from './Playground';
import SlugLink from './SlugLink';
import Tabs from './tabs';
import TabItem from './tabs/TabItem';
import TimezoneCollapse from './TimezoneCollapse';

export const docsComponents = {
  a: ({ href, ...props }: any) => {
    return <Link href={href} {...props} />;
  },
  img: (props: any) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }, [open]);

    return (
      <>
        <div
          className='relative cursor-pointer'
          onClick={() => {
            setOpen(true);
          }}
        >
          <img loading='lazy' className='block object-contain rounded-md max-w-full h-auto' {...props} />
          <div className='absolute rounded-md inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all' />
        </div>

        {/* when open */}
        <div
          className={`fixed inset-0 transition-all flex items-center h-screen justify-center bg-black bg-opacity-70 ${
            open ? 'opacity-100 z-50' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => {
            setOpen(false);
          }}
        >
          <div className='relative'>
            <img loading='lazy' className='block object-contain rounded-md max-w-full h-auto' {...props} />
            <div
              className='absolute top-0 right-0 z-50 p-2 -m-6 cursor-pointer'
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
            >
              <IconX size={24} />
            </div>
          </div>
        </div>
      </>
    );
  },
  APIBadge: (props: any) => {
    return <APIBadge {...props} />;
  },
  Playground: (props: any) => {
    return <Playground {...props} />;
  },
  TimezoneCollapse: (props: any) => {
    return <TimezoneCollapse {...props} />;
  },
  ExternalLinksBuilder: (props: any) => {
    return <ExternalLinksBuilder {...props} />;
  },
  pre: (props: any) => {
    const { theme } = useTheme();
    const className = props.children.props.className;
    const match = /language-(\w+)/.exec(className || '');
    return (
      <Highlight
        Prism={Prism}
        code={props.children.props.children.slice(0, -1)}
        // @ts-ignore
        language={match ? match[1] : 'text'}
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
    );
  },
  TabItem: (props: any) => {
    return <TabItem {...props} />;
  },
  Tabs: (props: any) => {
    return <Tabs {...props} />;
  },
  Alert: (props: any) => {
    return <Alert {...props} />;
  },

  h1: ({ id, children }: any) => {
    return (
      <h1 id={id} className='flex items-center group'>
        {children}
        <SlugLink id={id} />
      </h1>
    );
  },
  h2: ({ id, children }: any) => {
    return (
      <h2 id={id} className='flex items-center group'>
        {children}
        <SlugLink id={id} />
      </h2>
    );
  },
  h3: ({ id, children }: any) => {
    return (
      <h3 id={id} className='flex items-center group'>
        {children}
        <SlugLink id={id} />
      </h3>
    );
  },
};
