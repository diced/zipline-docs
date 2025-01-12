import dynamic from 'next/dynamic';
import { Heading } from './Headings';
import Image from './Image';
import APIBadge from './APIBadge';
import TabItem from './tabs/TabItem';
import Tabs from './tabs';
import Alert from './Alert';
import DocLinks from './DocLinks';

import Pre from './Pre';
import Link from 'next/link';

export const MDXComponents = {
  APIBadge: APIBadge,
  VariablesPlayground: dynamic(() => import('./VariablesPlayground')),
  TimezoneCollapse: dynamic(() => import('./TimezoneCollapse')),
  ExternalLinksBuilder: dynamic(() => import('./ExternalLinksBuilder')),
  TabItem: TabItem,
  Tabs: Tabs,
  Alert: Alert,
  DocLinks: DocLinks,
  Colors: dynamic(() => import('./Colors')),

  img: Image,
  pre: Pre,
  a: Link,

  h1: (props: any) => <Heading level={1} {...props} />,
  h2: (props: any) => <Heading level={2} {...props} />,
  h3: (props: any) => <Heading level={3} {...props} />,
  h4: (props: any) => <Heading level={4} {...props} />,
};
