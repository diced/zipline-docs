import React, { useState } from 'react';
import CodeBlock from '@theme/CodeBlock';

export default function ExternalLinksBuilder() {
  const [links, setLinks] = useState([]);
  const [labelValue, setLabelValue] = useState('');
  const [linkValue, setLinkValue] = useState('');

  const handleAdd = () => {
    const newLink = {
      label: labelValue.trim(),
      link: linkValue.trim()
    };

    if (newLink.label.length === 0) return;
    if (newLink.link.length === 0) return;

    try {
      new URL(newLink.link);
    } catch (e) {
      return;
    }

    setLinks([...links, newLink]);
    setLabelValue('');
    setLinkValue('');
  }

  return (
    <div>
      <div style={{ marginBottom: '.5rem' }}>
        <input style={{ padding: '.5rem', marginRight: '.5rem' }} placeholder='Label' value={labelValue} onChange={e => setLabelValue(e.target.value)} />
        <input style={{ padding: '.5rem', marginRight: '.5rem' }} placeholder='Link' value={linkValue} onChange={e => setLinkValue(e.target.value)} />
        <button className='button button--primary button--md' onClick={handleAdd}>add</button>
      </div>

      <table style={{ width: '100%' }}>
        <thead style={{ width: '100%' }}>
          <tr>
            <th style={{ width: '100%' }}>Label</th>
            <th style={{ width: '100%' }}>Link</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link, index) => (
            <tr key={index}>
              <td>{link.label}</td>
              <td>{link.link}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <CodeBlock language='bash'>
        WEBSITE_EXTERNAL_LINKS='{JSON.stringify(links)}'
      </CodeBlock>
    </div>
  )
};