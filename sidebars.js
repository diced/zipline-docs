module.exports = {
  sidebar: [
    {
      type: 'category',
      label: 'Zipline',
      items: [
        'getting-started',
        'migrations',
        'nginx'
      ]
    },
    {
      type: 'category',
      label: 'Uploaders',
      items: [
        'uploaders/sharex',
        'uploaders/curl',
        'uploaders/flameshot'
      ]
    },
    {
      type: 'category',
      label: 'Configuration',
      items: [
        'config/overview',
        'config/example',
        {
          type: 'category',
          label: 'Sections',
          items: [
            'config/core',
            'config/database',
            'config/uploader'
          ]
        }
      ]
    }
  ]
};
