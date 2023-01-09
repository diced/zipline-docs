import type { PrismTheme } from 'prism-react-renderer';

const theme: PrismTheme = {
  plain: {
    color: '#bfbdb6',
    backgroundColor: '#24262D',
  },
  styles: [
    {
      types: ['comment'],
      style: {
        color: 'rgba(172, 182, 191, 0.55)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['string', 'symbol'],
      style: {
        color: 'rgb(170, 217, 76)',
      },
    },
    {
      types: ['char', 'constant'],
      style: {
        color: 'rgb(149, 230, 203)',
      },
    },
    {
      types: ['number', 'builtin'],
      style: {
        color: 'rgb(210, 166, 255)',
      },
    },
    {
      types: ['variable'],
      style: {
        color: 'rgb(191, 189, 182)',
      },
    },
    {
      types: ['operator', 'punctuation'],
      style: {
        color: 'rgb(242, 150, 104)',
      },
    },
    {
      types: ['function', 'attr-name'],
      style: {
        color: 'rgb(255, 180, 84)',
      },
    },
    {
      types: ['tag'],
      style: {
        color: 'rgb(57, 186, 230)',
      },
    },
    {
      types: ['inserted'],
      style: {
        color: 'rgb(127, 217, 98)',
      },
    },
    {
      types: ['changed'],
      style: {
        color: 'rgb(115, 184, 255)',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: 'rgb(242, 109, 120)',
      },
    },
  ],
};

export default theme;
