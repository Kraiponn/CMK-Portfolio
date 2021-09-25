import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Box } from '@mui/system';
import { Container, List, ListItem, Toolbar } from '@mui/material';

// Form validation
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { IAuthForm, IPwdDisplay } from '@src/utils/types/auth';

// State management
import { useAppDispatch, useAppSelector } from '@src/features/hooks/useStore';
import { setSuccessProcess, signup } from '@src/features/store/slices/auth';

// App Languages
import { EN_US_LOCALE_TYPE, enUs, th } from '@src/features/languages';

// Components
import Layout from '@src/components/Layout';
import Backdrop from '@src/components/Backdrop';
import Loader from '@src/components/Loader';
import CMInput from '@src/components/ui/CMInput';
import SigninAlert from '@src/components/auth/AuthAlert';
import CMPwdInput from '@src/components/ui/CMPwdInput';
import CMButton from '@src/components/ui/CMButton';
import SigninLink from '@src/components/auth/signup/signinLink';

/**********************************************
 *    Main Function
 */
const SignupPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, success, error } = useAppSelector((state) => state.auth);

  const [pwd, setPwd] = React.useState<IPwdDisplay>({
    showPwd: false,
    showConfirmPwd: false,
  });

  const router = useRouter();
  const { authPage: pageAuthObj } =
    router.locale === EN_US_LOCALE_TYPE ? enUs : th;

  const schema = yup.object().shape({
    username: yup.string().required(pageAuthObj.uNameRequired),
    email: yup
      .string()
      .required(pageAuthObj.emailRequired)
      .email(pageAuthObj.emailValidType),
    password: yup
      .string()
      .min(6, pageAuthObj.pwdMin)
      .max(18, pageAuthObj.pwdMax)
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], pageAuthObj.confirmPwdMatch),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthForm>({
    resolver: yupResolver(schema),
  });

  const handleOnSubmitForm: SubmitHandler<IAuthForm> = (data) => {
    // console.log(data);
    dispatch(signup(data));
  };

  const handleToggleDisplayPwd = (pwdType: string) => {
    if (pwdType === 'password') {
      setPwd({ ...pwd, showPwd: !pwd.showPwd });
    } else {
      setPwd({ ...pwd, showConfirmPwd: !pwd.showConfirmPwd });
    }
  };

  const cleanAuthState = useCallback(() => {
    dispatch(setSuccessProcess());
  }, [dispatch]);

  if (success) {
    dispatch(setSuccessProcess());

    // Redirect to Signin page
    router.push('/auth/signin', '/auth/signin', { locale: `${router.locale}` });
  }

  useEffect(() => {
    // console.log('use effect in signup page');

    return () => {
      cleanAuthState();
    };
  }, [cleanAuthState]);

  return (
    <Layout title="Signup" description="signup page">
      <Backdrop openBackDrop={isLoading} />
      <Loader isLoading={isLoading} />
      <Toolbar />

      <Container
        sx={{
          width: { xs: '90%', sm: '67%', md: '55%' },
          marginTop: '1rem',
        }}
      >
        <Box
          sx={{
            fontFamily:
              router.locale === EN_US_LOCALE_TYPE
                ? 'Bangers-Regular'
                : 'Prompt-Medium',
            fontWeight: 'bold',
            fontSize: '2.9rem',
            letterSpacing: '2px',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1rem',
          }}
        >
          {pageAuthObj.signupLabel}
        </Box>

        <SigninAlert message={error} />

        <form onSubmit={handleSubmit(handleOnSubmitForm)}>
          <List>
            <ListItem>
              <CMInput
                type="text"
                name="username"
                label={`${pageAuthObj.uNameLabel}`}
                control={control}
                errors={errors}
              />
            </ListItem>

            <ListItem>
              <CMInput
                type="email"
                name="email"
                label={`${pageAuthObj.emailLabel}`}
                control={control}
                errors={errors}
              />
            </ListItem>

            <ListItem>
              <CMPwdInput
                pwdType="password"
                name="password"
                label={pageAuthObj.pwdLabel}
                control={control}
                displayPwd={pwd.showPwd}
                errors={errors}
                handleToggleDisplayPwd={handleToggleDisplayPwd}
              />
            </ListItem>

            <ListItem>
              <CMPwdInput
                pwdType="password"
                name="confirmPassword"
                label={pageAuthObj.confirmPwdLabel}
                control={control}
                displayPwd={pwd.showConfirmPwd}
                errors={errors}
                handleToggleDisplayPwd={handleToggleDisplayPwd}
              />
            </ListItem>

            <ListItem>
              <CMButton
                buttonType="submit"
                variant="contained"
                label={pageAuthObj.submitButtonLabel}
                color="primary"
                fullWidth={false}
                horizontalAlignment="flex-end"
                borderRadius={0.5}
                marginTop={0.75}
                marginBottom={0}
              />
            </ListItem>

            <SigninLink
              appLang={router.locale as string}
              haveAccountLabel={pageAuthObj.haveAccountLabel}
              signinLink={pageAuthObj.signinLabel}
              textAlignment="flex-start"
              marginTop={0}
            />
          </List>
        </form>
      </Container>
    </Layout>
  );
};

export default SignupPage;
