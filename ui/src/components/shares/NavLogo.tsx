import React from 'react';
import NextLink from 'next/link';
import Image from 'next/image';

// Css frame work
import { Link } from '@mui/material';
import { Box } from '@mui/system';

// Colors system
import { cmYellowColor } from '@src/utils/colorsType';

/*************************************
 *   MAIN METHOD
 ************************************/
const NavLogo = () => {
  return (
    <>
      <NextLink href="/" passHref>
        <Link
          underline="none"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '5rem',
          }}
        >
          <Image
            src={`/images/business_man_thinking_1.svg`}
            alt="logo"
            width={35}
            height={35}
          />
          <Box
            sx={{
              color: `${cmYellowColor}`,
              alignSelf: 'center',
              fontFamily: 'JosefinSans-Bold',
              fontSize: '1.2rem',
            }}
            component="div"
          >
            CML
          </Box>
        </Link>
      </NextLink>
    </>
  );
};

export default NavLogo;
