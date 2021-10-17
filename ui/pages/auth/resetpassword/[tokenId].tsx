import React from 'react';
// import { GetServerSideProps } from 'next';

// App Languages
import { EN_US_LOCALE_TYPE, enUs, th } from '@src/features/languages';
import { useRouter } from 'next/router';

// State Managements
import { useAppSelector } from '@src/features/hooks/useStore';
import useResetPassword from '@src/features/hooks/useResetPassword';

// Css Libraries
import { Box } from '@mui/system';
import { List, ListItem, Toolbar, Typography } from '@mui/material';

// Action state
import Loader from '@src/components/shares/Loader';
import Backdrop from '@src/components/shares/Backdrop';

// Form validation
import * as yup from 'yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IAuthForm, IPwdDisplay } from '@src/utils/types/auth';
import { cmRedColor } from '@src/utils/colorsType';

// Components
import Layout from '@src/components/shares/Layout';
import CMPwdInput from '@src/components/ui/CMPwdInput';
import CMButton from '@src/components/ui/CMButton';
import KSModal from '@src/components/shares/KSModal';

interface Props {
  token: { tokenId: string };
}

/*************************************************************************
 *   MAIN METHOD
 */
const ResetPasswordPage = ({ token }: Props) => {
  // console.log(`token on client side`, token.tokenId);
  //http://localhost:3000/auth/resetpassword/32f9dc3fa290cb3936fdf71006ae8110ed5d897e

  const [pwd, setPwd] = React.useState<IPwdDisplay>({
    showPwd: false,
    showConfirmPwd: false,
  });

  const { appLang } = useAppSelector((state) => state.ui);

  const router = useRouter();
  const { resetPwdPage: pageLangObj, authPage: pageAuthObj } =
    appLang === EN_US_LOCALE_TYPE ? enUs : th;

  const schema = yup.object().shape({
    password: yup
      .string()
      .required()
      .min(6, pageAuthObj.pwdMin)
      .max(18, pageAuthObj.pwdMax),
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

  const { isLoading, data, error, clearModal, resetPassword } =
    useResetPassword();

  // console.log('Main method:', error);
  // console.log('Main method params', router);

  /**************************
   * Sub method
   */
  const onSubmit: SubmitHandler<IAuthForm> = (value) => {
    // console.log(value);
    clearModal();

    const { password, confirmPassword } = value;
    const { tokenId: resetToken } = router.query;

    const body = {
      password,
      confirmPassword,
      resetToken,
    } as IAuthForm;

    console.log('On submit body', body, resetToken);

    resetPassword(body);
  };

  const handleNavigateToSigninPage = () => {
    // console.log('Forgot successfully.');

    router.push('/auth/signin', '/auth/signin', {
      locale: appLang,
    });
  };

  const handleToggleDisplayPwd = (pwdType: string) => {
    if (pwdType === 'password') {
      setPwd({ ...pwd, showPwd: !pwd.showPwd });
    } else {
      setPwd({ ...pwd, showConfirmPwd: !pwd.showConfirmPwd });
    }
  };

  if (data) {
    // console.log('Main method data', data);
    handleNavigateToSigninPage();
  }

  /*****************************************************
   *  RETURN MAIN COMPONENT
   */
  return (
    <Layout title={pageLangObj.title}>
      <KSModal
        open={Boolean(error)}
        handleClose={clearModal}
        errTitlte="Ops!!"
        errDetail={error?.message}
      />
      <Backdrop openBackDrop={isLoading} />
      <Loader isLoading={isLoading} />
      <Toolbar />

      <Box
        sx={{
          height: '90vh',
          width: { xs: '100%', sm: '70%', md: '50%' },
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <Typography
            variant="h1"
            component="h2"
            sx={{
              my: 2,
              textAlign: 'center',
              // letterSpacing: '5',
              fontFamily:
                appLang === EN_US_LOCALE_TYPE
                  ? 'Bangers-Regular'
                  : 'Prompt-Medium',
            }}
          >
            {pageLangObj.title}
          </Typography>

          <List>
            <ListItem>
              <CMPwdInput
                pwdType="password"
                name="password"
                label={pageAuthObj.newPwd}
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
                horizontalAlignment="center"
                borderRadius={0.5}
                marginTop={0.75}
                marginBottom={0}
              />
            </ListItem>
          </List>
        </form>
      </Box>
    </Layout>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const token = params;

//   console.log(token);

//   return {
//     props: {
//       token,
//     },
//   };
// };

export default ResetPasswordPage;
