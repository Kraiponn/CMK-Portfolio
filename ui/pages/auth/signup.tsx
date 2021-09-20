import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import {
  Alert,
  AlertTitle,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  OutlinedInput,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { IFormSignup, IPwdDisplay } from '@src/utils/types/auth';
import { cmRedColor } from '@src/utils/colorsType';

import { useAppDispatch, useAppSelector } from '@src/features/hooks/useStore';
import { setSuccessProcess, signup } from '@src/features/store/slices/auth';

import { toast } from 'react-toastify';
import ToastAlert from '@src/components/ToastAlert';

import Layout from '@src/components/Layout';
import Backdrop from '@src/components/Backdrop';
import Loader from '@src/components/Loader';

// App Languages
import { EN_US_LOCALE_TYPE, enUs, th } from '@src/features/languages';

const SingupLogo = styled('div')({
  position: 'relative',
  width: '100px',
  height: '100px',
  textAlign: 'center',
  margin: '2rem auto',
});

const SignupPage = () => {
  const dispatch = useAppDispatch();
  const {
    isLoading,
    success,
    error: mError,
  } = useAppSelector((state) => state.auth);

  const [pwd, setPwd] = React.useState<IPwdDisplay>({
    showPwd: false,
    showConfirmPwd: false,
  });

  const router = useRouter();
  const pageLangLabel = router.locale === EN_US_LOCALE_TYPE ? enUs : th;

  const schema = yup.object().shape({
    username: yup.string().required(pageLangLabel.singupPage.uNameRequired),
    email: yup
      .string()
      .required(pageLangLabel.singupPage.emailRequired)
      .email(pageLangLabel.singupPage.emailValidType),
    password: yup
      .string()
      .min(6, pageLangLabel.singupPage.pwdMin)
      .max(18, pageLangLabel.singupPage.pwdMax)
      .required(),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref('password'), null],
        pageLangLabel.singupPage.confirmPwdMatch
      ),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormSignup>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormSignup> = (data) => {
    // console.log(data);
    dispatch(signup(data));
  };

  const handleClickShowPassword = (pwdType: string) => {
    if (pwdType === 'password') {
      setPwd({ ...pwd, showPwd: !pwd.showPwd });
    } else {
      setPwd({ ...pwd, showConfirmPwd: !pwd.showConfirmPwd });
    }
  };

  if (success) {
    toast.success('Signup is successfully.');
    dispatch(setSuccessProcess());

    // Redirect to Signin page
    router.push('/auth/signin');
  }

  return (
    <Layout title="Signup" description="signup page">
      <Backdrop openBackDrop={isLoading} />
      <Loader isLoading={isLoading} />
      <ToastAlert />
      <Toolbar />

      <Container
        maxWidth="sm"
        sx={{
          height: '90vh',
          marginTop: '2rem',
          position: 'relative',
        }}
      >
        <SingupLogo>
          <Image
            src={`/images/auth.png`}
            alt="signin logo"
            layout="fill"
            objectFit="cover"
          />
        </SingupLogo>

        <form onSubmit={handleSubmit(onSubmit)}>
          <List>
            {mError ? (
              <ListItem>
                <Alert severity="error" sx={{ width: '100%' }}>
                  <AlertTitle>Error</AlertTitle>
                  <Typography variant="h5" component="h5">
                    {mError}
                  </Typography>
                </Alert>
              </ListItem>
            ) : null}

            <ListItem>
              <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    type="text"
                    fullWidth
                    label={`${pageLangLabel.singupPage.uNameLabel}`}
                    error={Boolean(errors.username)}
                    helperText={errors.username?.message}
                  />
                )}
              />
            </ListItem>

            <ListItem>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="email"
                    fullWidth
                    label={`${pageLangLabel.singupPage.emailLabel}`}
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </ListItem>

            <ListItem>
              <FormControl sx={{ width: '100%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  {`${pageLangLabel.singupPage.pwdLabel}`}
                </InputLabel>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <OutlinedInput
                      {...field}
                      id="outlined-adornment-amount"
                      type={pwd.showPwd ? 'text' : 'password'}
                      fullWidth
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => handleClickShowPassword('password')}
                            // onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {pwd.showPwd ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label={`${pageLangLabel.singupPage.pwdLabel}`}
                      // placeholder={`${pageLangLabel.singupPage.pwdLabel}`}
                      error={Boolean(errors.password)}
                    />
                  )}
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <Typography
                variant="h6"
                component="h5"
                sx={{ color: `${cmRedColor}` }}
              >
                {errors.password && errors.password.message}
              </Typography>
            </ListItem>

            <ListItem>
              <FormControl sx={{ width: '100%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-confirm-password">
                  {`${pageLangLabel.singupPage.confirmPwdLabel}`}
                </InputLabel>
                <Controller
                  name="confirmPassword"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <OutlinedInput
                      {...field}
                      id="outlined-adornment-confirm-password"
                      type={pwd.showConfirmPwd ? 'text' : 'password'}
                      fullWidth
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle confirm password visibility"
                            onClick={() =>
                              handleClickShowPassword('confirmPassword')
                            }
                            // onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {pwd.showConfirmPwd ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label={`${pageLangLabel.singupPage.confirmPwdLabel}`}
                      // placeholder={`${pageLangLabel.singupPage.confirmPwdLabel}`}
                      error={Boolean(errors.confirmPassword)}
                    />
                  )}
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <Typography
                variant="h6"
                component="h5"
                sx={{ color: `${cmRedColor}` }}
              >
                {errors.confirmPassword && errors.confirmPassword.message}
              </Typography>
            </ListItem>

            <ListItem>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ width: '90%', margin: '0 auto', py: '0.5rem' }}
              >
                {`${pageLangLabel.singupPage.submitButtonLabel}`}
              </Button>
            </ListItem>
          </List>
        </form>
      </Container>
    </Layout>
  );
};

export default SignupPage;
