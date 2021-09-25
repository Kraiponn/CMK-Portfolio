import React from 'react';

import { Box } from '@mui/system';
import { Button } from '@mui/material';

interface Props {
  buttonType: 'submit' | 'button';
  variant: 'contained' | 'outlined' | 'text';
  color: 'primary' | 'secondary';
  label: string;
  fullWidth: boolean;
  horizontalAlignment: 'flex-start' | 'center' | 'flex-end';
  borderRadius: number;
  marginTop: number;
  marginBottom: number;
}

const CMButton = ({
  buttonType,
  variant,
  color,
  label,
  fullWidth,
  horizontalAlignment,
  borderRadius,
  marginTop,
  marginBottom,
}: Props) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: horizontalAlignment,
        marginTop: `${marginTop}rem`,
        marginBottom: `${marginBottom}rem`,
      }}
    >
      <Button
        type={buttonType}
        variant={variant}
        color={color}
        sx={{
          width: fullWidth ? '100%' : '45%',
          padding: '0.5rem 0',
          borderRadius: `${borderRadius}rem`,
        }}
      >
        {label}
      </Button>
    </Box>
  );
};

export default CMButton;
