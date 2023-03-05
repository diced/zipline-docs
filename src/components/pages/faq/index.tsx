import Link from 'next/link';
import { ReactNode } from 'react';
import Item from './Item';
import Image from 'next/image';

import ghChooseIssue from '../../../../public/faq/gh-choose-issue.png';
import ghNewDisc from '../../../../public/faq/gh-new-disc.png';

export function Ref(props: { href: string; children: ReactNode }) {
  return <Link className='decoration-blue-400 underline hover:decoration-2' {...props} />;
}

export function Code(props: { children: ReactNode }) {
  return <code className='bg-gray-50 rounded-md px-1 font-normal dark:bg-gray-700' {...props} />;
}

export function Img(props: { src: any; alt: string }) {
  return <Image placeholder='blur' className='rounded-md' {...props} />;
}

const items = [
  {
    title: 'How do I update?',
    content: (
      <>
        Simply follow the instructions <Ref href='/docs/get-started#updating'>here</Ref>.
      </>
    ),
    id: 'how-do-i-update',
  },
  {
    title: "What's HTTP error (XXX)?",
    content:
      "HTTP error (XXX) is an error that occurs when the server is unable to process your request. This can be caused by a number of things, such as a server error, or a problem your request. If you are getting this error, it may be useful to check Zipline's logs, or your browser logs.",
    id: 'http-error-xxx',
  },
  {
    title: (
      <>
        What is the difference between <Code>latest</Code> and <Code>trunk</Code>
      </>
    ),
    content: (
      <>
        <Code>latest</Code> is the latest stable release, for example <Code>v3.6.4</Code>, <Code>v3.6.2</Code>
        . The <Code>trunk</Code> is the latest commit on the <Code>trunk</Code> branch, hence the tag name{' '}
        <Code>trunk</Code>.
        <br />
        Generally, <Code>trunk</Code> is unstable and should not be used in production. However, since
        releases take a while to come out, <Code>trunk</Code> is useful for those who want to use the latest
        features, or not have to deal with bugs that aren&apos;t fixed in <Code>latest</Code>.
      </>
    ),
    id: 'latest-vs-trunk',
  },
  {
    title: 'How long do releases take?',
    content: (
      <>
        Major releases, like <Code>v3.6.4</Code> to <Code>v3.7.0</Code>, take a while to come out, since they
        under many variations of release candidates (RC&quot;s).
        <br />
        Typically release will have many <Code>beta</Code> versions before any single <Code>rc</Code> version.
        <br />
        The <Code>beta</Code> versions are beta versions, and are NOT considered stable enough to be used in
        production. The upside to using a <Code>beta</Code> version is that it is more likely to have the
        latest features, and you will get a new <Code>beta</Code> version very frequently.
        <br />
        The <Code>rc</Code> versions are release candidates, and are considered stable enough to be used in
        production, but be aware that there may be small bugs that were not squashed. The upside to using an{' '}
        <Code>rc</Code> version is that it is more likely to have the latest features, and you will get a new{' '}
        <Code>rc</Code> version every week or so during the release timeline
      </>
    ),
    id: 'how-long-do-releases-take',
  },
  {
    title: 'I found a bug, what do I do?',
    content: (
      <>
        If you found a bug, please report it on the{' '}
        <Ref href='https://github.com/diced/zipline/issues/new/choose'>GitHub</Ref> repository. Please make
        sure to fill out any relevant fields, to make it easier for us to fix the bug.
        <br />
        <br />
        <Img src={ghChooseIssue} alt='GitHub choose issue' />
      </>
    ),
    id: 'i-found-a-bug-what-do-i-do',
  },
  {
    title: 'I have a feature request/suggestion, what do I do?',
    content: (
      <>
        If you have a feature request/suggestion, make a discussion on the{' '}
        <Ref href='https://github.com/diced/zipline/discussions/new'>GitHub</Ref> repository. Select the
        &quot;Ideas&quot; category, and be as descriptive as possible.
        <br />
        <br />
        <Img src={ghNewDisc} alt='GitHub new discussion' />
      </>
    ),
    id: 'i-have-a-feature-request',
  },
  {
    title: 'How do I configure a domain?',
    content: (
      <>
        By default, Zipline uses the hostname in the URL for the domain when uploading or shortening URLs.
        There are various ways to &quot;add&quot; a domain, but the most obvious way is doing it through your
        DNS provider. You can add a CNAME record to your DNS provider, and point it to{' '}
        <Code>
          {'{'}ip of your instance{'}'}
        </Code>
      </>
    ),
    id: 'how-do-i-add-a-custom-domain',
  },
  {
    title: 'What is the default username and password',
    content: (
      <>
        The default username and password is <Code>administrator</Code> and <Code>password</Code>. Make sure
        to change this right after you login for the first time.
      </>
    ),
    id: 'what-is-the-default-username-and-password',
  },
  {
    title: 'How do I change the favicon?',
    content: (
      <>
        To change the favicon, you can replace the <Code>public/favicon.ico</Code> file with your own favicon.
        This must be a .ico file.
      </>
    ),
    id: 'how-do-i-change-the-favicon',
  },
  {
    title: 'I got locked out of my account!',
    content: (
      <>
        If you got locked out of your account, you can reset your password by using a{' '}
        <Ref href='/docs/guides/scripts/set-user'>helper script</Ref>.
        <br />
        <Code>
          ... scripts:set-user {'{'}id{'}'} password {'{'}new-password{'}'}
        </Code>
        <br />
        <span className='text-xs'>
          <Code>...</Code> = yarn/npm/docker-compose exec zipline yarn
        </span>
      </>
    ),
    id: 'i-got-locked-out-of-my-account',
  },
];

export default function FAQPage() {
  return (
    <>
      {items.map((item, i) => (
        <Item key={i} title={item.title} id={item.id}>
          {item.content}
        </Item>
      ))}
    </>
  );
}
