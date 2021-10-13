import React from 'react';
import { GetServerSideProps } from 'next';

import axios from 'axios';
import Layout from '@src/components/Layout';
import { Typography } from '@mui/material';

interface Props {
  token: { tokenId: string };
  message: string;
}

const ResetPasswordPage = ({ token, message }: Props) => {
  console.log(`token on client side`, token.tokenId, message);

  return (
    <Layout title="Resetpassword">
      <Typography variant="h1" component="h3">
        Reset Password
      </Typography>
      <p>TokenId: {}</p>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const token = params;
  // const { data } = await axios.get(
  //   `${process.env.NEXT_PUBLIC_API_URL}/auth/resetpassword/${token}`
  // );

  console.log(token);

  return {
    props: {
      token,
      message: 'successfully',
    },
  };
};

export default ResetPasswordPage;
