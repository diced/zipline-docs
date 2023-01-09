import type { PrismTheme } from 'prism-react-renderer';

const theme: PrismTheme = {
  plain: {
    color: '#5c6166',
    // backgroundColor: '#fcfcfc',
    backgroundColor: '#f7f7f7',
  },
  styles: [
    {
      types: ['comment'],
      style: {
        color: 'rgba(120, 123, 128, 0.6)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['string', 'symbol'],
      style: {
        color: 'rgb(134, 179, 0)',
      },
    },
    {
      types: ['char', 'constant'],
      style: {
        color: 'rgb(76, 191, 153)',
      },
    },
    {
      types: ['number', 'builtin'],
      style: {
        color: 'rgb(163, 122, 204)',
      },
    },
    {
      types: ['variable'],
      style: {
        color: 'rgb(92, 97, 102)',
      },
    },
    {
      types: ['operator', 'punctuation'],
      style: {
        color: 'rgb(237, 147, 102)',
      },
    },
    {
      types: ['function', 'attr-name'],
      style: {
        color: 'rgb(242, 174, 73)',
      },
    },
    {
      types: ['tag'],
      style: {
        color: 'rgb(85, 180, 212)',
      },
    },
    {
      types: ['inserted'],
      style: {
        color: 'rgb(108, 191, 67)',
      },
    },
    {
      types: ['changed'],
      style: {
        color: 'rgb(71, 138, 204)',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: 'rgb(255, 115, 131)',
      },
    },
  ],
};

export default theme;
