/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundSize: {
        'size-200': '200% 200%',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
      },
      typography: (theme) => ({
        DEFAULT: {
          // light mode
          css: {
            color: theme('colors.black'),
            a: {
              color: theme('colors.black'),
              textDecorationColor: theme('colors.blue.400'),
              '&:hover': {
                textDecorationThickness: '2px',
              },
            },
            'h2,h3,h4': {
              scrollMarginTop: '100px',
            },
            'ul > li::before': {
              backgroundColor: theme('colors.gray.400'),
            },
            code: {
              color: theme('colors.black'),
              backgroundColor: theme('colors.gray.100'),
              borderRadius: theme('borderRadius.md'),
              paddingRight: theme('spacing.1'),
              paddingLeft: theme('spacing.1'),
            },
            pre: {
              overflow: 'scroll',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            // th: {
            //   color: theme('colors.black'),
            // },
            // td: {
            //   color: theme('colors.black'),
            // },
            // strong: {
            //   color: theme('colors.black'),
            // },
            // h1: {
            //   color: theme('colors.black'),
            // },
            // h2: {
            //   color: theme('colors.black'),
            // },
            // h3: {
            //   color: theme('colors.black'),
            // },
            // h4: {
            //   color: theme('colors.black'),
            // },
            // h5: {
            //   color: theme('colors.black'),
            // },
            // h6: {
            //   color: theme('colors.black'),
            // },
            // p: {
            //   color: theme('colors.black'),
            // },
          },
        },
        invert: {
          // dark mode
          css: {
            color: theme('colors.gray.900'),
            a: {
              color: theme('colors.white'),
              textDecorationColor: theme('colors.blue.400'),
              '&:hover': {
                // color: theme('colors.blue.400'),
                textDecorationThickness: '2px',
              },
            },
            'h2,h3,h4': {
              scrollMarginTop: '100px',
            },
            'ul > li::before': {
              backgroundColor: theme('colors.gray.400'),
            },
            code: {
              color: theme('colors.white'),
              backgroundColor: theme('colors.gray.800'),
              borderRadius: theme('borderRadius.md'),
              padding: theme('spacing.1'),
              paddingTop: theme('spacing.0'),
              paddingBottom: theme('spacing.0'),
            },
            pre: {
              overflow: 'scroll',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            th: {
              color: theme('colors.white'),
            },
            strong: {
              color: theme('colors.white'),
            },
            h1: {
              color: theme('colors.white'),
            },
            h2: {
              color: theme('colors.white'),
            },
            h3: {
              color: theme('colors.white'),
            },
            h4: {
              color: theme('colors.white'),
            },
            h5: {
              color: theme('colors.white'),
            },
            h6: {
              color: theme('colors.white'),
            },
            p: {
              color: theme('colors.white'),
            },
          },
        },
      }),
      colors: {
        gray: {
          50: '#EEEFF1',
          100: '#DDDFE4',
          200: '#BBBEC8',
          300: '#999EAD',
          400: '#777E92',
          500: '#5B6071',
          600: '#494D5A',
          700: '#373A44',
          800: '#24262D',
          900: '#121317',
        },
        blue: {
          50: '#E9F4FB',
          100: '#D8EBF8',
          200: '#ADD5F0',
          300: '#86C2EA',
          400: '#5AACE2',
          500: '#3498DB',
          600: '#207AB6',
          700: '#195D8B',
          800: '#103D5B',
          900: '#082030',
        },
        yellow: {
          50: '#FEFBEC',
          100: '#FDF8DE',
          200: '#FAF1B8',
          300: '#F7EA96',
          400: '#F5E370',
          500: '#F2DB4E',
          600: '#EED011',
          700: '#B59E0D',
          800: '#776809',
          900: '#3E3605',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

module.exports = tailwindConfig;
