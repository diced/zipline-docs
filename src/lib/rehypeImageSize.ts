import getImageSize from 'image-size';
import { visit } from 'unist-util-visit';

export const rehypeImageSize = (options: { root: string }): any => {
  return (tree: any) => {
    visit(tree, { type: 'element', tagName: 'img' }, (node) => {
      if (node.properties.width || node.properties.height) return;

      const path = `${options?.root ?? ''}${node.properties.src}`;
      const { width, height } = getImageSize(path);

      node.properties.width = width;
      node.properties.height = height;
    });
  };
};

export default rehypeImageSize;
