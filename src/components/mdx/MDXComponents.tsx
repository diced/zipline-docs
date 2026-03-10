import dynamic from 'next/dynamic';
import Alert from './Alert';
import DocLinks from './DocLinks';
import { Heading } from './Headings';
import Image from './Image';
import Tabs from './tabs';
import TabItem from './tabs/TabItem';

import Link from 'next/link';
import Pre from './Pre';
import CodeInline from './CodeInline';

export const MDXComponents = {
  VariablesPlayground: dynamic(() => import('./VariablesPlayground')),
  TimezoneCollapse: dynamic(() => import('./TimezoneCollapse')),
  ExternalLinksBuilder: dynamic(() => import('./ExternalLinksBuilder')),
  TabItem: TabItem,
  Tabs: Tabs,
  Alert: Alert,
  DocLinks: DocLinks,
  Colors: dynamic(() => import('./Colors')),
  CodeInline: CodeInline,

  img: Image,
  pre: Pre,
  a: Link,

  h1: (props: any) => <Heading level={1} {...props} />,
  h2: (props: any) => <Heading level={2} {...props} />,
  h3: (props: any) => <Heading level={3} {...props} />,
  h4: (props: any) => <Heading level={4} {...props} />,

  ApiDocs: dynamic(() => import('../ApiDocs')),
};
