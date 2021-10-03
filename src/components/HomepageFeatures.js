import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Easy to Use',
    Svg: require('../../static/img/setup.svg').default,
    description: (
      <>
        Setup zipline in just 1 command using docker-compose
      </>
    )
  },
  {
    title: 'Configurable',
    Svg: require('../../static/img/options.svg').default,
    description: (
      <>
        Almost every part of Zipline is customizable, to the routes it serves and the theme of the dashboard 
      </>
    )
  },
  {
    title: 'Image Uploading',
    Svg: require('../../static/img/upload.svg').default,
    description: (
      <>
        Zipline supports uploading images, favoriting images to view them later and with ZWS support (zero-width space urls)
      </>
    )
  },
  {
    title: 'URL Shortening',
    Svg: require('../../static/img/shorten.svg').default,
    description: (
      <>
        Zipline now supports URL Shortening, with vanity links and ZWS support
      </>
    )
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--3')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
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
