import { APIPage } from '@/components/api-page';
import { OpenAPIDownloadButton } from '@/components/openapi-dl-button';
import * as TabComponents from '@/components/tabs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ImageZoom } from './image-zoom';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ...TabComponents,
    APIPage,
    OpenAPIDownloadButton,
    img: (props) => <ImageZoom {...(props as any)} />,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
