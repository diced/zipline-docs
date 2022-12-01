import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Features",
    description: (
      <>
        <ul>
          <li>Setup quickly with a few commands</li>
          <li>Most of Zipline can be modified to your liking</li>
          <li>Image uploading as well as normal files</li>
          <li>URL Shortening with vanity links and zero-width space URLs</li>
          <li>Text uploading</li>
          <li>
            URL Formats (uuid, dates, random alphanumeric, original name, zws)
          </li>
          <li>Discord embeds (OG metadata)</li>
          <li>Gallery viewer that supports multiple media formats</li>
          <li>Code highlighting</li>
        </ul>
      </>
    ),
  },
  {
    title: "More...",
    description: (
      <>
        <ul>
          <li>User Invites</li>
          <li>Fully customizable Discord webhook notifications</li>
          <li>Password protected uploads</li>
          <li>Image compression</li>
          <li>File Chunking (for uploading large files)</li>
          <li>File/URL deletion once it reaches a view treshold.</li>
          <li>OAuth 2 registration via Discord/GitHub</li>
          <li>
            Two-Factor authentication with Google Authentication, authy, etc
            (totp services)
          </li>
        </ul>
      </>
    ),
  },
];

function Feature({ title, description }) {
  return (
    <div className={clsx("col col--6")}>
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
        <div className={clsx("container", styles.marginBottom)}>
          <h1 className={styles.centerText}>About</h1>
          Zipline is a file upload server that is easy to use while being packed
          with features.
          <br />
          <br />
          The original idea for Zipline was to create a small, fast and easy to
          use file upload server to use with{" "}
          <a href="https://getsharex.com">ShareX</a>. Zipline now has more
          features, and is being updated with new stuff!
          <br />
          <br />
          Zipline is currently maintained by{" "}
          <a href="https://github.com/diced">me</a>, and can be found on{" "}
          <a href="https://github.com/diced/zipline">GitHub</a>, feel free to
          leave a star.
        </div>

        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
