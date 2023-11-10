import { PaletteMode } from '@mui/material';

const assembleThemeObj = (mode: PaletteMode) => ({
   // ================================= component overrides
   components: {
      // select element menu items
      MuiMenuItem: {
         styleOverrides: {
            root: {
               ...(mode === 'light'
                  ? {
                       '&:hover': {
                          backgroundColor: '#e3e5e8',
                       },
                       '&.Mui-selected': {
                          backgroundColor: '#add8e6',
                       },
                       '&.Mui-selected:hover': {
                          backgroundColor: '#99cfe0',
                       },
                    }
                  : {
                       '&:hover': {
                          backgroundColor: '#20212C',
                       },
                       '&.Mui-selected': {
                          color: '#FFFFFF',
                          backgroundColor: '#348fab',
                       },
                       '&.Mui-selected:hover': {
                          backgroundColor: '#2e7e98',
                       },
                    }),
            },
         },
      },

      MuiLink: {
         styleOverrides: {
            root: {
               cursor: 'pointer',
            },
         },
      },

      MuiCssBaseline: {
         styleOverrides: {
            body: {
               scrollbarWidth: 'thin',
            },
            '::-webkit-scrollbar': {
               width: '0.4em',
            },
            '::-webkit-scrollbar-track': {
               background: '#f1f1f1',
               borderRadius: '8px',
            },
            '::-webkit-scrollbar-thumb': {
               backgroundColor: '#888',
               borderRadius: '8px',
            },
            '::-webkit-scrollbar-thumb:hover': {
               background: '#555',
            },
         },
      },
   },

   // ==================================== typography
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
         lineHeight: 30 / 24,
      },
      h3: {
         fontWeight: 700,
         fontSize: 18 / 16 + 'rem',
         lineHeight: 23 / 18,
      },
      h4: {
         fontWeight: 700,
         fontSize: 15 / 16 + 'rem',
         lineHeight: 19 / 15,
      },
      h5: {
         fontWeight: 700,
         fontSize: 12 / 16 + 'rem',
         lineHeight: 15 / 12,
         letterSpacing: '2.4px',
      },
      body1: {
         fontWeight: 500,
         fontSize: 13 / 16 + 'rem',
         lineHeight: 23 / 13,
      },
      body2: {
         fontWeight: 700,
         fontSize: 12 / 16 + 'rem',
         lineHeight: 15 / 12,
      },
   },
   // ===================================== palette
   palette: {
      mode,
      ...(mode === 'light'
         ? {
              text: {
                 primary: '#2B2C37',
              },
              background: {
                 paper: '#FFFFFF',
                 default: '#e3e5e8',
              },
              divider: '#E4EBFA',
           }
         : {
              text: {
                 primary: '#FFFFFF',
              },
              background: {
                 paper: '#2B2C37',
                 default: '#20212C',
              },
              divider: '#3E3F4E',
           }),
      common: {
         black: '#000112',
         white: '#FFFFFF',
      },
      primaryCustom: {
         main: '#635FC7',
         light: '#A8A4FF',
      },
      secondaryCustom: {
         main: 'rgba(99, 95, 199, 0.25)',
         light: 'rgba(99, 95, 199, 0.1)',
      },
      destructCustom: {
         main: '#EA5555',
         light: '#FF9898',
      },
      linesCustom: {
         main: '#3E3F4E',
         light: '#E4EBFA',
      },
      greyCustom: {
         100: '#F4F7FD',
         200: '#828FA3',
         300: '#2B2C37',
         400: '#20212C',
      },
   },
});

const components = {
   components: {
      MuiMenuItem: {
         styleOverrides: {
            root: {
               '&:hover': {
                  backgroundColor: 'background.default',
               },
               '&.Mui-selected': {
                  backgroundColor: 'lightblue',
               },
            },
         },
      },
   },
};

export { assembleThemeObj };
