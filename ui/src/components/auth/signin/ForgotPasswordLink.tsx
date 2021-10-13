import React from 'react';
import NextLink from 'next/link';

import { Box } from '@mui/system';
import { Link, ListItem, Typography } from '@mui/material';

import { cmRedColor, cmSecondaryColor } from '@src/utils/colorsType';

interface Props {
  appLang: string;
  noAccountLabel: string;
  signupLabel: string;
  forgotPwdLabel: string;
}

const ForgotPasswordLink = ({
  appLang,
  noAccountLabel,
  signupLabel,
  forgotPwdLabel,
}: Props) => {
  return (
    <>
      <ListItem>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            marginTop: '5px',
          }}
        >
          <Typography variant="h6" component="h6">
            {noAccountLabel} &nbsp;
          </Typography>

          <NextLink href="/auth/signup" passHref locale={`${appLang}`}>
            <Link underline="none">
              <Typography
                variant="h6"
                component="h6"
                sx={{
                  color: `${cmRedColor}`,
                  fontWeight: 'bold',
                  ':hover': {
                    color: `${cmSecondaryColor}`,
                  },
                }}
              >
                {signupLabel}
              </Typography>
            </Link>
          </NextLink>
        </Box>
      </ListItem>

      <ListItem>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            marginTop: '5px',
          }}
        >
          <NextLink href="/auth/forgotpassword" passHref locale={`${appLang}`}>
            <Link underline="none">
              <Typography
                variant="h6"
                component="h6"
                sx={{
                  ':hover': {
                    color: `${cmSecondaryColor}`,
                  },
                }}
              >
                {forgotPwdLabel}
              </Typography>
            </Link>
          </NextLink>
        </Box>
      </ListItem>
    </>
  );
};

export default ForgotPasswordLink;
