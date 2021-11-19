import React from 'react';

import { Toolbar } from '@mui/material';

// Action state and components
import Layout from '@src/components/shares/Layout';
import SettingList from '@src/components/setting';

interface Props {}

/*************************************************************
 *                       MAIN METHOD
 ************************************************************/
const SettingPage = (props: Props) => {
  return (
    <Layout title="Setting" description="setting">
      <Toolbar />

      <SettingList />
    </Layout>
  );
};

export default SettingPage;
