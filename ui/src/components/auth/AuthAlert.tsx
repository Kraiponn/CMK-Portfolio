import React from 'react';
import { Alert, Container } from '@mui/material';

interface Props {
  message: string;
}

const AuthAlert = ({ message }: Props) => {
  if (!message) return null;

  return (
    <Container>
      <Alert severity="error">{message}</Alert>
    </Container>
  );
};

export default AuthAlert;
