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
import Loader from '@src/components/shares/Loader';
import Backdrop from '@src/components/shares/Backdrop';
import Layout from '@src/components/shares/Layout';

// Styles
import styles from '@styles/forgotpassword.module.css';
import useForgotPassword from '@src/features/hooks/useForgotpassword';
import AuthAlert from '@src/components/auth/AuthAlert';
import KSModal from '@src/components/shares/KSModal';

// Form validation
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IAuthForm } from '@src/utils/types/auth';
import { cmRedColor } from '@src/utils/colorsType';
import { useAppSelector } from '@src/features/hooks/useStore';

interface Props {}

/*************************************************************************
 *                            MAIN METHOD
 ************************************************************************/
const SettingPage = (props: Props) => {
  const { appLang } = useAppSelector((state) => state.ui);

  const router = useRouter();
  const { topNavBar: pageLangObj } = appLang === EN_US_LOCALE_TYPE ? enUs : th;

  return (
    <Layout title="Setting">
      <Toolbar />

      <Box sx={{}}>
        <Typography variant="h2" component="h2">
          Setting Page
        </Typography>
      </Box>
    </Layout>
  );
};

export default SettingPage;
