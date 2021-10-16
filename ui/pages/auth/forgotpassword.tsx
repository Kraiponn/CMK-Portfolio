import React from 'react';

// App Languages
import { EN_US_LOCALE_TYPE, enUs, th } from '@src/features/languages';
import { useRouter } from 'next/router';

import {
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import EmailIcon from '@mui/icons-material/AttachEmail';

// Action state
import Loader from '@src/components/Loader';
import Backdrop from '@src/components/Backdrop';
import Layout from '@src/components/Layout';

// Styles
import styles from '@styles/forgotpassword.module.css';
import useForgotPassword from '@src/features/hooks/useForgotpassword';
import AuthAlert from '@src/components/auth/AuthAlert';
import KSModal from '@src/components/KSModal';

// Form validation
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IAuthForm } from '@src/utils/types/auth';
import { cmRedColor } from '@src/utils/colorsType';

/*************************************************************************
 *   MAIN METHOD
 */
const ForgotPasswordPage = () => {
  const { isLoading, success, error, requestForgotPassword, clearState } =
    useForgotPassword();

  const router = useRouter();
  const { forgotPasswordPage: pageLangObj, authPage: pageAuthObj } =
    router.locale === EN_US_LOCALE_TYPE ? enUs : th;

  const schema = yup.object().shape({
    email: yup
      .string()
      .required(pageAuthObj.emailRequired)
      .email(pageAuthObj.emailValidType),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthForm>({
    resolver: yupResolver(schema),
  });

  // const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue(event.target.value);
  // };

  const onSubmit: SubmitHandler<IAuthForm> = (value) => {
    // console.log(value);

    requestForgotPassword(value.email as string);
  };

  const handleNavigateToSigninPage = () => {
    router.push('/auth/finishedforgotpwd', '/auth/finishedforgotpwd', {
      locale: router.locale,
    });
  };

  if (success) {
    handleNavigateToSigninPage();
  }

  return (
    <Layout title={pageLangObj.title}>
      <KSModal
        open={Boolean(error)}
        handleClose={clearState}
        errTitlte="Ops!!"
        errDetail={error as string}
      />
      <Backdrop openBackDrop={isLoading} />
      <Loader isLoading={isLoading} />
      <Toolbar />

      <Box sx={{ position: 'relative', height: '90vh', width: '100%' }}>
        {error && <AuthAlert message={error as string} />}

        <div className={styles.container}>
          <Typography
            className={styles.forgotTitle}
            variant="h2"
            component="h3"
            sx={{
              fontFamily:
                router.locale === EN_US_LOCALE_TYPE
                  ? 'JosefinSans-Regular'
                  : 'Prompt-Regular',
            }}
          >
            {pageLangObj.title}
          </Typography>

          <Typography
            className={styles.forgotTitle}
            variant="body1"
            component="h3"
            sx={{
              mt: 1,
              fontFamily:
                router.locale === EN_US_LOCALE_TYPE
                  ? 'JosefinSans-Regular'
                  : 'Prompt-Regular',
            }}
          >
            {pageLangObj.description}
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className={styles.edtEmail}
                  type="email"
                  sx={{
                    width: { xs: '100%', md: '70%', lg: '50%' },
                    marginTop: '3rem',
                  }}
                  placeholder={pageLangObj.emailBoxLabel}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(errors.email)}
                />
              )}
            />

            <Typography
              variant="h6"
              component="h5"
              sx={{ mt: 1, color: `${cmRedColor}` }}
            >
              {errors && errors.email?.message}
            </Typography>

            <Button
              sx={{
                display: 'block',
                width: { xs: '100%', md: '70%', lg: '50%' },
                margin: '3rem auto',
                fontFamily:
                  router.locale === EN_US_LOCALE_TYPE
                    ? 'JosefinSans-Regular'
                    : 'Prompt-Regular',
              }}
              type="submit"
              className={styles.submit_button}
              variant="contained"
              color="primary"
            >
              {isLoading ? (
                <CircularProgress color="secondary" size={30} />
              ) : (
                pageLangObj.resetPwdButton
              )}
            </Button>
          </form>
        </div>
      </Box>
    </Layout>
  );
};

export default ForgotPasswordPage;
