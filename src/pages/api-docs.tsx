import { useEffect } from 'react';

export default function DocsPage() {
  useEffect(() => {
    import('rapidoc');
  }, []);

  return (
    <rapi-doc
      spec-url='/openapi.json'
      render-style='read'
      layout='column'
      show-header='false'
      mono-font='JetBrains Mono, monospace'
      use-path-in-nav-bar='true'
      show-method-in-nav-bar='as-colored-text'
      default-schema-tab='schema'
    />
  );
}
