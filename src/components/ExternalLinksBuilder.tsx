import React, { useState } from 'react';

export default function ExternalLinksBuilder() {
  const [links, setLinks] = useState([]);
  const [labelValue, setLabelValue] = useState('');
  const [linkValue, setLinkValue] = useState('');

  const handleAdd = () => {
    const newLink = {
      label: labelValue.trim(),
      link: linkValue.trim(),
    };

    if (newLink.label.length === 0) return;
    if (newLink.link.length === 0) return;

    try {
      new URL(newLink.link);
    } catch (e) {
      return;
    }

    // @ts-ignore
    setLinks([...links, newLink]);
    setLabelValue('');
    setLinkValue('');
  };

  return (
    <div>
      <div className='flex-row space-y-4 md:space-y-0 md:flex gap-4'>
        <input
          className='focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-md leading-6 text-gray-800 dark:text-gray-200 placeholder-slate-400 rounded-md p-2 ring-2 ring-gray-700 shadow-sm'
          type='text'
          aria-label='Label for the link'
          placeholder='Label for the link'
          value={labelValue}
          onChange={(e) => setLabelValue(e.target.value)}
        />
        <input
          className='focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-md leading-6 text-gray-800 dark:text-gray-200 placeholder-slate-400 rounded-md p-2 ring-2 ring-gray-700 shadow-sm'
          type='text'
          aria-label='The link (must be a valid link)'
          placeholder='The link (must be a valid link)'
          value={linkValue}
          onChange={(e) => setLinkValue(e.target.value)}
        />
        <button
          className='bg-blue-400 w-full md:w-auto rounded-md p-2 px-4 transition-all hover:bg-blue-500 ease-in-out disabled:bg-gray-300 disabled:dark:bg-gray-600 disabled:text-gray-100 disabled:dark:text-gray-300'
          onClick={handleAdd}
          disabled={labelValue.trim().length === 0 || linkValue.trim().length === 0}
        >
          Add
        </button>
      </div>
      {links.length ? (
        <table>
          <thead>
            <tr>
              <th className='w-full'>Label</th>
              <th className='w-full'>Link</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link: any, index) => (
              <tr key={index}>
                <td>{link.label}</td>
                <td>
                  <a target='_blank' rel='noreferrer' href={link.link}>
                    {link.link}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className='mt-4 border border-gray-200 dark:border-gray-800 rounded-md p-2 text-gray-300 dark:text-gray-400'>
          No links added yet
        </div>
      )}
      <pre className='language-bash'>WEBSITE_EXTERNAL_LINKS=&apos;{JSON.stringify(links)}&apos;</pre>
      Or if using Docker Compose, you need to remove the single quotes surrounding them:
      <pre className='language-bash'>WEBSITE_EXTERNAL_LINKS={JSON.stringify(links)}</pre>
    </div>
  );
}
