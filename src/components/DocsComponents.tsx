import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Highlight } from 'prism-react-renderer';
import ayuDark from '../lib/themes/ayuDark';
import ayuLight from '../lib/themes/ayuLight';
import SlugLink from './SlugLink';

export const docsComponents = {
  APIBadge: dynamic(() => import('./APIBadge')),
  Playground: dynamic(() => import('./Playground')),
  TimezoneCollapse: dynamic(() => import('./TimezoneCollapse')),
  ExternalLinksBuilder: dynamic(() => import('./ExternalLinksBuilder')),
  TabItem: dynamic(() => import('./tabs/TabItem')),
  Tabs: dynamic(() => import('./tabs')),
  Alert: dynamic(() => import('./Alert')),

  pre: (props: any) => {
    const { theme } = useTheme();
    const className = props.children.props.className;
    const match = /language-(\w+)/.exec(className || '');
    return (
      <Highlight
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

  a: ({ href, ...props }: any) => {
    return <Link href={href} {...props} />;
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
  h4: ({ id, children }: any) => {
    return (
      <h4 id={id} className='flex items-center group'>
        {children}
        <SlugLink id={id} />
      </h4>
    );
  },
};
