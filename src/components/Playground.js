import React, { useState } from 'react';
import CodeBlock from '@theme/CodeBlock';

function parse(str, image, user) {
  if (!str) return null;

  return str
    .replace(/{user.admin}/gi, user.administrator ? 'yes' : 'no')
    .replace(/{user.id}/gi, user.id.toString())
    .replace(/{user.name}/gi, user.username)
    .replace(/{image.id}/gi, image.id.toString())
    .replace(/{image.mime}/gi, image.mimetype)
    .replace(/{image.file}/gi, image.file)
    .replace(/{image.created_at.full_string}/gi, image.created_at.toLocaleString())
    .replace(/{image.created_at.time_string}/gi, image.created_at.toLocaleTimeString())
    .replace(/{image.created_at.date_string}/gi, image.created_at.toLocaleDateString());
}

export default function Playground () {
  const [value, setValue] = useState('{user.name} {image.id} {image.file}');
  const sampleData = {
    user: {
      administrator: true,
      id: 1,
      username: 'administrator'
    },
    image: {
      id: 1,
      mimetype: 'image/png',
      file: 'asdfgh.png',
      created_at: new Date
    }
  };
  const [parsed, setParsed] = useState(parse(value, sampleData.image, sampleData.user));

  const handle = event => {
    setValue(event.target.value);
    setParsed(parse(event.target.value, sampleData.image, sampleData.user));
  }

  return (
    <>
      <input value={value} onChange={handle} style={{ width: '100%', padding: 5, marginBottom: '10px' }}/>
      <CodeBlock className='language-jsx'>
        {'// input\n'}
        '{value}'
        {'\n\n'}
        {'// output\n'}
        '{parsed}'
      </CodeBlock>
    </>
  )
};