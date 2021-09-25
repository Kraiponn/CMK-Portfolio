import React from 'react';
import { useRouter } from 'next/router';

import { Box } from '@mui/system';
import { Button, Container, Grid, Typography } from '@mui/material';
import { cmDarkColor, cmYellowColor } from '@src/utils/colorsType';

// State management
import { useAppSelector } from '@src/features/hooks/useStore';

// App Languages
import {
  enUs,
  th,
  EN_US_LOCALE_TYPE,
  TH_LOCALE_TYPE,
} from '@src/features/languages';

const LeftSide = () => {
  const router = useRouter();
  const { appLang } = useAppSelector((state) => state.ui);

  const { homePage, authPage } =
    router.locale === EN_US_LOCALE_TYPE ? enUs : th;

  // Redirect to home page
  const handleClickBackToHomePage = () => {
    router.push(`/`, `/`, { locale: `${appLang}` });
  };

  return (
    <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
      <Box
        sx={{
          background: `rgb(55, 71, 79)`,
          // backgroundImage: `linear-gradient(to bottom right, red, yellow)`,
          width: '100%',
          height: '100vh',
          position: 'relative',
        }}
      >
        <Container
          sx={{
            padding: '2rem',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
          <Typography
            className="welcome"
            variant="h2"
            component="h5"
            sx={{
              color: '#fff',
            }}
          >
            {authPage.welcomeLabel}
          </Typography>

          <Typography
            className="welcome-detail"
            variant="h5"
            component="h5"
            sx={{
              color: '#fff',
              marginTop: '2rem',
              marginBottom: '3rem',
            }}
          >
            {authPage.welcomeDetailLabel}
          </Typography>

          <Button
            className="btn-signup"
            onClick={handleClickBackToHomePage}
            variant="contained"
            sx={{
              bgcolor: `${cmYellowColor}`,
              color: `${cmDarkColor}`,
              fontFamily:
                appLang === TH_LOCALE_TYPE
                  ? 'Prompt-Medium'
                  : 'Bangers-Regular',
              paddingLeft: '2.5rem',
              paddingRight: '2.5rem',
              borderRadius: '2rem',
            }}
          >
            {homePage.title}
          </Button>
        </Container>
      </Box>
    </Grid>
  );
};

export default LeftSide;
