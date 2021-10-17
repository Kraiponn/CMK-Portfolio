import React from 'react';
import { useRouter } from 'next/router';

// App Languages
import { EN_US_LOCALE_TYPE, enUs, th } from '@src/features/languages';

import { IconButton, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import SuccessCheckIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';

// State management
import { useAppSelector } from '@src/features/hooks/useStore';

// Components
import Layout from '@src/components/shares/Layout';
import { cmPrimaryColor } from '@src/utils/colorsType';

/*************************************************************************
 *   MAIN METHOD
 */
const FinishedForgotPwdPage = () => {
  const { appLang } = useAppSelector((state) => state.ui);

  const router = useRouter();
  const { resetPwdPage: pageLangObj } =
    appLang === EN_US_LOCALE_TYPE ? enUs : th;

  const handleNavigateToHome = () => {
    router.push('/', '/', { locale: appLang });
  };

  return (
    <Layout title={pageLangObj.title}>
      <Toolbar />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          padding: '1rem',
        }}
      >
        <IconButton onClick={handleNavigateToHome}>
          <ArrowBackIcon color="primary" fontSize="medium" />
          <Typography
            variant="h4"
            component="h5"
            sx={{ color: `${cmPrimaryColor}` }}
          >
            {pageLangObj.backHome}
          </Typography>
        </IconButton>
      </Box>

      <Box
        sx={{
          width: '90%',
          height: '70vh',
          margin: '0 auto',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <SuccessCheckIcon color="success" fontSize="large" />
        <Box>
          <Typography variant="h2" component="h2">
            {pageLangObj.finishTitle}
          </Typography>
        </Box>

        <Typography variant="h5" component="h5">
          {pageLangObj.finishDescription}
        </Typography>
      </Box>
    </Layout>
  );
};

export default FinishedForgotPwdPage;
