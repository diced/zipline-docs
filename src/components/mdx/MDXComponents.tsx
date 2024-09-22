import dynamic from 'next/dynamic';
import { Heading } from './Headings';

export const MDXComponents = {
  APIBadge: dynamic(() => import('./APIBadge')),
  Playground: dynamic(() => import('./Playground')),
  TimezoneCollapse: dynamic(() => import('./TimezoneCollapse')),
  ExternalLinksBuilder: dynamic(() => import('./ExternalLinksBuilder')),
  TabItem: dynamic(() => import('./tabs/TabItem')),
  Tabs: dynamic(() => import('./tabs')),
  Alert: dynamic(() => import('./Alert')),
  DocLinks: dynamic(() => import('./DocLinks')),
  Colors: dynamic(() => import('./Colors')),

  img: dynamic(() => import('./Image')),
  pre: dynamic(() => import('./Pre')),
  a: dynamic(() => import('next/link')),

  h1: (props: any) => <Heading level={1} {...props} />,
  h2: (props: any) => <Heading level={2} {...props} />,
  h3: (props: any) => <Heading level={3} {...props} />,
  h4: (props: any) => <Heading level={4} {...props} />,
};
