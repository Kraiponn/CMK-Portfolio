import React from 'react';
import NextLink from 'next/link';

// Css frame work
import { Box } from '@mui/system';
import { Link, Typography } from '@mui/material';

// Color system
import {
  cmBlackColor,
  cmLigthOrangeColor,
  cmOrangeColor,
  cmRedColor,
  cmSecondaryColor,
  cmWhiteColor,
  cmYellowColor,
} from '@src/utils/colorsType';

interface Props {
  title: string;
  pathname: string;
  marginTop: string;
  padding: string;
  isActive: boolean;
}

/*******************************************
 *            MAIN METHOD
 ******************************************/
const MobileMenuLink = ({
  title,
  pathname,
  marginTop,
  padding,
  isActive,
}: Props) => {
  return (
    <>
      <NextLink href={pathname} passHref>
        <Link underline="none">
          <Typography
            variant="h4"
            component="h5"
            sx={{
              color: isActive ? `${cmYellowColor}` : `${cmWhiteColor}`,
              textShadow: isActive ? `.25rem .25rem .1rem ${cmBlackColor}` : '',
              mt: marginTop,
              p: padding,
              '&:hover': {
                color: `${cmYellowColor}`,
                transform: 'scale(1.1)',
              },
            }}
          >
            {title}
          </Typography>
        </Link>
      </NextLink>
    </>
  );
};

export default MobileMenuLink;
