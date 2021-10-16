import React from 'react';
import NextLink from 'next/link';

import { Box } from '@mui/system';
import { Link, ListItem, Typography } from '@mui/material';

import { cmRedColor, cmSecondaryColor } from '@src/utils/colorsType';

interface Props {
  appLang: string;
  haveAccountLabel: string;
  signinLink: string;
  textAlignment: 'flex-start' | 'center' | 'flex-end';
  marginTop: number;
}

const SigninLink = ({
  appLang,
  haveAccountLabel,
  signinLink,
  textAlignment,
  marginTop,
}: Props) => {
  return (
    <>
      <ListItem>
        <Box
          sx={{
            display: 'flex',
            justifyContent: textAlignment,
            width: '100%',
            marginTop: `${marginTop}px`,
          }}
        >
          <Typography variant="h5" component="h5">
            {haveAccountLabel} &nbsp;
          </Typography>

          <NextLink href="/auth/signin" passHref locale={`${appLang}`}>
            <Link underline="none">
              <Typography
                variant="h5"
                component="h5"
                sx={{
                  color: `${cmRedColor}`,
                  fontWeight: 'bold',
                  ':hover': {
                    color: `${cmSecondaryColor}`,
                  },
                }}
              >
                {signinLink}
              </Typography>
            </Link>
          </NextLink>
        </Box>
      </ListItem>
    </>
  );
};

export default SigninLink;
