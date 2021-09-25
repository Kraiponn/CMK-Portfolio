import { createTheme, Theme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { useAppSelector } from '@src/features/hooks/useStore';
import { cmPrimaryColor, cmSecondaryColor } from '@src/utils/colorsType';

interface IAppTheme {
  theme: Theme;
}

const useTheme = (): IAppTheme => {
  const { themeMode } = useAppSelector((state) => state.ui);

  // Create a theme instance.
  const theme = createTheme({
    palette: {
      mode: themeMode ? 'dark' : 'light',
      primary: {
        main: `${cmPrimaryColor}`,
      },
      secondary: {
        main: `${cmSecondaryColor}`,
      },
    },
    mixins: {
      toolbar: {
        minHeight: '56px',
        'media (min-width:0px) and (orientation:landscape)': {
          minHeight: '48px',
        },
        'media (min-width:600px)': {
          minHeight: '56px',
        },
      },
    },
    typography: {
      fontFamily: [
        // 'JosefinSans-Medium',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      h1: {
        fontSize: '3rem',
        fontFamily: 'JosefinSans-Medium',
        fontWeight: 'bold',
      },
      h2: {
        fontSize: '1.9rem',
        fontFamily: 'JosefinSans-Medium',
        fontWeight: 'bold',
      },
      h3: {
        fontSize: '1.5rem',
        fontFamily: 'JosefinSans-Medium',
        fontWeight: 'bold',
      },
      h4: {
        fontSize: '1.2rem',
        fontFamily: 'JosefinSans-Medium',
        fontWeight: 'bold',
      },
      h5: {
        fontSize: '1rem',
        fontFamily: 'JosefinSans-Medium',
        fontWeight: 'bold',
      },
      h6: {
        fontSize: '0.9rem',
        fontFamily: 'JosefinSans-Medium',
        fontWeight: 'bold',
      },
      button: {
        textTransform: 'none',
        fontFamily: 'JosefinSans-Medium',
        fontSize: '1.1rem',
      },
    },
    // components: {
    //   MuiTextField: {
    //     styleOverrides: {
    //       root: {
    //         paddingTop: '2px',
    //         paddingBottom: '2px',
    //       },
    //     },
    //   },
    // },
  });

  return {
    theme,
  };
};

export { useTheme };
