import React from 'react';
import { useRouter } from 'next/router';

// Css frame work
import { Grid } from '@mui/material';

// Action state
import Loader from '@src/components/shares/Loader';
import Backdrop from '@src/components/shares/Backdrop';

// State management
import { useAppSelector, useAppDispatch } from '@src/features/hooks/useStore';
import { signin } from '@src/features/store/slices/auth';
import { IAuthForm } from '@src/utils/types/auth';

// App Languages
import { enUs, th, EN_US_LOCALE_TYPE } from '@src/features/languages';

// Components
import EmptyLayout from '@src/components/shares/EmptyLayout';
import LeftSide from '@src/components/auth/signin/LeftSide';
import MainContent from '@src/components/auth/signin/MainContent';

// Page props
interface Props {}

/*************************************************************************
 *                            MAIN METHOD
 ************************************************************************/
const SigninPage = (props: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { appLang } = useAppSelector((state) => state.ui);
  const { isLoading, success, error } = useAppSelector((state) => state.auth);

  const { authPage: pageLangObj } = appLang === EN_US_LOCALE_TYPE ? enUs : th;

  const handleSubmitForm = (formValue: IAuthForm) => {
    // console.log('Submit value:', formValue);
    const { email, password } = formValue;

    dispatch(signin({ email, password }));
  };

  if (success) {
    // toast.success('Signin successfully');
    router.push('/', '/', { locale: `${appLang}` });
  }

  return (
    <EmptyLayout title={pageLangObj.signinLabel}>
      <Backdrop openBackDrop={isLoading} />
      <Loader isLoading={isLoading} />

      <Grid container spacing="1">
        <LeftSide />
        <MainContent errMessage={error} onSubmitForm={handleSubmitForm} />
      </Grid>
    </EmptyLayout>
  );
};

export default SigninPage;
