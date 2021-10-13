import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Box } from '@mui/system';
import {
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  List,
  ListItem,
} from '@mui/material';

// State management
import { useAppSelector, useAppDispatch } from '@src/features/hooks/useStore';
import { setSuccessProcess } from '@src/features/store/slices/auth';

// Form validation
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IAuthForm, IPwdDisplay } from '@src/utils/types/auth';

// App Languages
import { enUs, th, EN_US_LOCALE_TYPE } from '@src/features/languages';

// Components
import TopNavMenu from '@src/components/auth/signin/TopNavMenu';
import CMInput from '@src/components/ui/CMInput';
import CMPwdInput from '@src/components/ui/CMPwdInput';
import CMButton from '@src/components/ui/CMButton';
import ForgotPasswordLink from '@src/components/auth/signin/ForgotpasswordLink';
import AuthAlert from '@src/components/auth/AuthAlert';

interface Props {
  onSubmitForm: (value: IAuthForm) => void;
  errMessage: string;
}

const MainContent = ({ onSubmitForm, errMessage }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { appLang } = useAppSelector((state) => state.ui);
  const [pwd, setPwd] = React.useState<IPwdDisplay>({
    showPwd: false,
    showConfirmPwd: false,
  });

  const pageLangLabel = router.locale === EN_US_LOCALE_TYPE ? enUs : th;
  const schema = yup.object().shape({
    email: yup
      .string()
      .required(pageLangLabel.authPage.emailRequired)
      .email(pageLangLabel.authPage.emailValidType),
    password: yup
      .string()
      .min(6, pageLangLabel.authPage.pwdMin)
      .max(18, pageLangLabel.authPage.pwdMax)
      .required(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: 'kraiponn@gmail.com',
      password: 'admin989',
    },
  });

  const handleToggleDisplayPwd = (pwdType: string) => {
    if (pwdType === 'password') {
      setPwd({ ...pwd, showPwd: !pwd.showPwd });
    } else {
      setPwd({ ...pwd, showConfirmPwd: !pwd.showConfirmPwd });
    }
  };

  // Submit form
  const handleOnSubmitForm: SubmitHandler<IAuthForm> = (data) => {
    // console.log(data);
    onSubmitForm(data);
  };

  const handleClickBackToHomePage = () => {
    router.push(`/`, `/`, { locale: `${appLang}` });
  };

  const cleanAuthState = useCallback(() => {
    dispatch(setSuccessProcess());
  }, [dispatch]);

  // Life cycle events control
  useEffect(() => {
    // console.log('use effect in signup page');

    return () => {
      cleanAuthState();
    };
  }, [cleanAuthState]);

  return (
    <>
      <Grid item xs={12} md={7}>
        <TopNavMenu handleClickBackToHomePage={handleClickBackToHomePage} />

        <Container
          sx={{
            width: { xs: '90%', sm: '80%' },
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
              marginBottom: '1.2rem',
            }}
          >
            {pageLangLabel.authPage.signinLabel}
          </Box>

          <AuthAlert message={errMessage} />

          <form onSubmit={handleSubmit(handleOnSubmitForm)}>
            <List>
              <ListItem>
                <CMInput
                  type="email"
                  name="email"
                  label={`${pageLangLabel.authPage.emailLabel}`}
                  control={control}
                  errors={errors}
                />
              </ListItem>

              <ListItem>
                <CMPwdInput
                  pwdType="password"
                  name="password"
                  label={pageLangLabel.authPage.pwdLabel}
                  control={control}
                  displayPwd={pwd.showPwd}
                  errors={errors}
                  handleToggleDisplayPwd={handleToggleDisplayPwd}
                />
              </ListItem>

              <ListItem>
                <FormControlLabel
                  label={pageLangLabel.authPage.rememberMeLabel}
                  control={<Checkbox />}
                />
              </ListItem>

              <ListItem>
                <CMButton
                  buttonType="submit"
                  variant="contained"
                  label={pageLangLabel.authPage.submitButtonLabel}
                  color="primary"
                  borderRadius={1}
                  fullWidth={false}
                  horizontalAlignment="flex-end"
                  marginTop={0}
                  marginBottom={0}
                />
              </ListItem>

              <ForgotPasswordLink
                appLang={appLang}
                noAccountLabel={pageLangLabel.authPage.noAccountLabel}
                signupLabel={pageLangLabel.authPage.signupLinkLabel}
                forgotPwdLabel={pageLangLabel.authPage.forgotPwdLabel}
              />
            </List>
          </form>
        </Container>
      </Grid>
    </>
  );
};

export default MainContent;
