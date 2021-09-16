import { createTheme, Theme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { useAppSelector } from '@src/features/hooks/useStore';

interface IAppTheme {
  theme: Theme;
}

const useTheme = (): IAppTheme => {
  const { themeMode } = useAppSelector((state) => state.ui);

  // Create a theme instance.
  const theme = createTheme({
    palette: {
      mode: themeMode ? 'dark' : 'light',
      // primary: {
      //   main: '#556cd6',
      // },
      // secondary: {
      //   main: '#19857b',
      // },
      error: {
        main: red.A400,
      },
      // background: {
      //   default: '#FAFAFA',
      // },
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
      h1: {
        fontSize: '2rem',
        fontFamily: 'JosefinSans-Medium',
        fontWeight: 'bold',
      },
      h2: {
        fontSize: '1.7rem',
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
    },
  });

  return {
    theme,
  };
};

export { useTheme };
