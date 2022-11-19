const assembleThemeObj = (mode: any, theme: any) => ({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Plus Jakarta Sans"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
    ].join(','),
    h2: {
      fontWeight: 700,
      fontSize: 24 / 16 + 'rem',
      lineHeight: 30 / 24
    },
    h3: {
      fontWeight: 700,
      fontSize: 18 / 16 + 'rem',
      lineHeight: 23 / 18,
    },
    h4: {
      fontWeight: 700,
      fontSize: 15 / 16 + 'rem',
      lineHeight: 19 / 15
    },
    h5: {
      fontWeight: 700,
      fontSize: 12 / 16 + 'rem',
      lineHeight: 15 / 12,
      letterSpacing: '2.4px'
    },
    body1: {
      fontWeight: 500,
      fontSize: 13 / 16 + 'rem',
      lineHeight: 23 / 13,
    },
    body2: {
      fontWeight: 700,
      fontSize: 12 / 16 + 'rem',
      lineHeight: 15 / 12
    }
  },
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          text: {
            primary: '#2B2C37',
          },
        }
      : {
          text: {
            primary: '#FFFFFF'
          }
        }),
    common: {
      black: '#000112',
      white: '#FFFFFF'
    },
    primaryCustom: {
      main: '#635FC7',
      light: '#A8A4FF'
    },
    secondaryCustom: {
      main: 'rgba(99, 95, 199, 0.25)',
      light: 'rgba(99, 95, 199, 0.1)'
    },
    destructCustom: {
      main: '#EA5555',
      light: '#FF9898'
    },
    linesCustom: {
      main: '#3E3F4E',
      light: '#E4EBFA'
    },
    greyCustom: {
      100: '#F4F7FD',
      200: '#828FA3',
      300: '#2B2C37',
      400: '#20212C'
    }
  },
})

export { assembleThemeObj }

