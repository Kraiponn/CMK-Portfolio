import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

// App Languages
import { EN_US_LOCALE_TYPE, enUs, th } from '@src/features/languages';
import thFlag from 'public/images/th-flag.png';
import enUSFlag from 'public/images/en-us-flag.png';

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  Toolbar,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import Brightness2Icon from '@mui/icons-material/Brightness2';

// Colors system
import {
  cmBlackColor,
  cmOrangeColor,
  cmWhiteColor,
  cmYellowColor,
} from '@src/utils/colorsType';

// App state management
import { useAppSelector, useAppDispatch } from '@src/features/hooks/useStore';
import { setAppLanguages, setDarkMode } from '@src/features/store/slices/ui';

// Action state and components
import Layout from '@src/components/shares/Layout';

interface Props {}

/*************************************************************
 *                       MAIN METHOD
 ************************************************************/
const SettingPage = (props: Props) => {
  const { appLang, themeMode } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  const { settingsPage: pageLangObj } =
    appLang === EN_US_LOCALE_TYPE ? enUs : th;

  const handleLnaguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const selectedLang = (e.target as HTMLInputElement).value;
    const selectedLang = event.target.value;

    dispatch(setAppLanguages(selectedLang));
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedMode = event.target.value;

    dispatch(setDarkMode(selectedMode === 'dark' ? true : false));
  };

  return (
    <Layout title="Setting" description="setting">
      <Toolbar />

      <Box
        sx={{
          width: '85%',
          height: '90vh',
          margin: '2rem auto',
        }}
      >
        <Typography variant="h3" component="h5" sx={{ mb: 3 }}>
          {pageLangObj.title}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
              }}
            >
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  <Typography
                    variant="h4"
                    component="h5"
                    sx={{
                      color: themeMode ? `${cmWhiteColor}` : `${cmBlackColor}`,
                      mb: 1,
                    }}
                  >
                    {pageLangObj.languages.title}
                  </Typography>
                </FormLabel>

                <FormControlLabel
                  checked={appLang === EN_US_LOCALE_TYPE ? true : false}
                  value="en-US"
                  label={
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Image
                        src={enUSFlag}
                        alt="enUS-flag"
                        width={30}
                        height={30}
                      />
                      &nbsp;
                      <Typography variant="h5" component="h5">
                        {pageLangObj.languages.enUs}
                      </Typography>{' '}
                    </Box>
                  }
                  control={<Radio onChange={handleLnaguageChange} />}
                />

                <FormControlLabel
                  checked={appLang !== EN_US_LOCALE_TYPE ? true : false}
                  value="th"
                  label={
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Image
                        src={thFlag}
                        alt="th-flag"
                        width={30}
                        height={30}
                      />
                      &nbsp;
                      <Typography variant="h5" component="h5">
                        {pageLangObj.languages.th}
                      </Typography>{' '}
                    </Box>
                  }
                  control={<Radio onChange={handleLnaguageChange} />}
                />
              </FormControl>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
              }}
            >
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  <Typography
                    variant="h4"
                    component="h5"
                    sx={{
                      color: themeMode ? `${cmWhiteColor}` : `${cmBlackColor}`,
                      mb: 1,
                    }}
                  >
                    {pageLangObj.theme.title}
                  </Typography>
                </FormLabel>

                <FormControlLabel
                  checked={themeMode !== true ? true : false}
                  value="light"
                  label={
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <BrightnessHighIcon
                        fontSize="large"
                        sx={{ color: `${cmOrangeColor}` }}
                      />
                      &nbsp;
                      <Typography variant="h5" component="h5">
                        {pageLangObj.theme.light}
                      </Typography>{' '}
                    </Box>
                  }
                  control={<Radio onChange={handleThemeChange} />}
                />

                <FormControlLabel
                  checked={themeMode === true ? true : false}
                  value="dark"
                  label={
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Brightness2Icon
                        fontSize="large"
                        sx={{ color: `${cmYellowColor}` }}
                      />
                      &nbsp;
                      <Typography variant="h5" component="h5">
                        {pageLangObj.theme.dark}
                      </Typography>{' '}
                    </Box>
                  }
                  control={<Radio onChange={handleThemeChange} />}
                />
              </FormControl>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default SettingPage;
