import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'About',
    description: <>
      Zipline is a file upload server that is easy to use while being packed with features.
      <br /><br />
      The original idea for Zipline was to create a small, fast and easy to use file upload server
      to use with <a href="https://getsharex.com">ShareX</a>.
      <br /><br />
      Zipline is currently maintained and maintained by <a href="https://github.com/diced">me</a>,
      and can be found on <a href="https://github.com/diced/zipline">GitHub</a>.
    </>
  },
  {
    title: 'Features',
    description: <>
      <ul>
        <li>Setup quickly with a few commands</li>
        <li>Most of Zipline can be modified to your liking</li>
        <li>Image uploading as well as normal files</li>
        <li>URL Shortening with vanity links and zero-width space URLs</li>
        <li>Text uploading</li>
        <li>URL Formats (uuid, dates, random alphanumeric, original name, zws)</li>
        <li>Discord embeds (OG metadata)</li>
        <li>Gallery viewer that supports multiple media formats</li>
        <li>Code highlighting</li>
        <li>OAuth 2 registration via Discord/GitHub</li>
        <li>User Invites</li>
        <li>Fully customizable Discord webhook notifications</li>
        <li>Password protected uploads</li>
        <li>Image compression</li>
      </ul>
    </>
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--6')}>
      <div className="padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
