import React, { useState } from 'react';
import Image from 'next/image';

// Css Frame Work
import { Box, styled, useTheme } from '@mui/system';
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Cloud';

// State Managements
import { useAppSelector, useAppDispatch } from '@src/features/hooks/useStore';
import { editedUser } from '@src/features/store/slices/auth';

// Languages
import { enUs, th, EN_US_LOCALE_TYPE } from '@src/features/languages';

// Form validation
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  IAuthForm,
  IFormAccount,
  IPwdDisplay,
  IUser,
} from '@src/utils/types/auth';

// Components
import Loader from '@src/components/shares/Loader';
import Backdrop from '@src/components/shares/Backdrop';
import EditFormProfile from '@src/components/dashboard/account/EditFormProfile';
import LeftSideEditProfile from '@src/components/dashboard/account/LeftSideEditProfile';
import axios, { AxiosError } from 'axios';

const editProfile = async (
  form: HTMLFormElement | undefined | FormData,
  userId: string,
  token: string
) => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  // console.log('Base url', url);
  // console.log('Token', token);

  try {
    const resp = await axios.put(`${url}/users/updateduser/${userId}`, form, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Result ', resp.data);
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
  }
};

/*************************************************************************
 *                            MAIN METHOD
 ************************************************************************/
const EditProfile = () => {
  const [selectedImage, setSelectedImage] = useState<File | undefined>();
  const { user, token, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // console.log('Users', user);
  // console.log('Edit form 1');

  const handleSelectedImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      // console.log('Image file:', e.target.files, e.target.files[0]);
    }
  };

  const handleSubmitForm: SubmitHandler<IAuthForm> = (value) => {
    // console.log(value);

    const formData = new FormData();
    formData.append('username', value.username);
    formData.append('email', value.email);
    formData.append('role', value.role);
    formData.append('sex', value.sex);
    formData.append('mobile', value.mobile);
    formData.append('age', value.age as unknown as string);
    formData.append('address', value.address);

    if (selectedImage) {
      formData.append('avatar', selectedImage as Blob, selectedImage?.name);
    }

    // editProfile(formData, user?.id as string, token as string);
    const mUpdatedFields: IFormAccount = {
      form: formData,
      token: token as string,
      userId: user?.id as string,
    };

    dispatch(editedUser(mUpdatedFields));
  };

  return (
    <>
      <Backdrop openBackDrop={isLoading} />
      <Loader isLoading={isLoading} />

      <Box
        sx={{
          width: '100%',
          height: '90vh',
          padding: '1rem',
        }}
      >
        <Grid container spacing={2}>
          <LeftSideEditProfile
            user={user}
            selectedImage={selectedImage}
            isMobile={isMobile}
            handleSelectedImage={handleSelectedImage}
          />

          <EditFormProfile handleSubmitForm={handleSubmitForm} />
        </Grid>
      </Box>
    </>
  );
};

export default EditProfile;
