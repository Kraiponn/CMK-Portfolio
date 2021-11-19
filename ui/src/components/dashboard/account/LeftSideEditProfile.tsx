import React from 'react';

// CSS Frame Work
import { Avatar, Button, Grid } from '@mui/material';
import { Box, styled } from '@mui/system';

// Global types
import { IUser } from '@src/utils/types/auth';

// Global state
import { useAppSelector } from '@src/features/hooks/useStore';

// App Languages
import { EN_US_LOCALE_TYPE, enUs, th } from '@src/features/languages';

// Custom component
const Input = styled('input')({
  display: 'none',
});

interface Props {
  selectedImage: File | null | undefined;
  user: IUser | null | undefined;
  isMobile: boolean;
  handleSelectedImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/*************************************************************************
 *                            MAIN METHOD
 ************************************************************************/
const LeftSideEditProfile = ({
  selectedImage,
  user,
  isMobile,
  handleSelectedImage,
}: Props) => {
  const { appLang } = useAppSelector((state) => state.ui);

  const {
    dashboardPage: { drawerMenu },
  } = appLang === EN_US_LOCALE_TYPE ? enUs : th;
  const pageLangObj = drawerMenu.account;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSelectedImage(e);
  };

  return (
    <Grid
      item
      xs={12}
      md={4}
      sx={{
        display: 'flex',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          my: 3,
        }}
      >
        <Box
          sx={{
            // width: '100%',
            margin: '2rem auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Avatar
            alt="profile"
            sx={{ width: '150px', height: '150px' }}
            variant="square"
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : user?.image?.secure_url
                ? user.image.secure_url
                : `/images/business_man_working.svg`
            }
          />

          <Box sx={{ textAlign: 'center' }}>
            <label htmlFor="container-profile-img">
              <Input
                type="file"
                accept="image/*"
                id="container-profile-img"
                multiple
                onChange={handleOnChange}
              />

              <Button
                variant="outlined"
                color="secondary"
                component="div"
                sx={{ mt: 4 }}
              >
                {pageLangObj.selectedImageButton}
              </Button>
            </label>
          </Box>
        </Box>
      </Box>

      {!isMobile && (
        <Box sx={{ border: `.1px solid grey`, my: 5, opacity: '0.45' }}></Box>
      )}
    </Grid>
  );
};

export default LeftSideEditProfile;
