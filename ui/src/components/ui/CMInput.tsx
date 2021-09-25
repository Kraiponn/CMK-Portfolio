import React from 'react';

import {
  FormControl,
  FormHelperText,
  FormLabel,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/AttachEmail';
import PersonIcon from '@mui/icons-material/Person';

// Form validation
import { Controller, Control, FieldError } from 'react-hook-form';

import { cmRedColor } from '@src/utils/colorsType';
import { IAuthForm } from '@src/utils/types/auth';

type Errors = {
  username?: FieldError | undefined;
  email?: FieldError | undefined;
};

interface Props {
  control: Control<IAuthForm, object>;
  name: 'username' | 'email';
  type: 'text' | 'email' | 'number';
  label: string;
  errors: Errors;
}

const CMInput = ({ control, name, type, label, errors }: Props) => {
  const handlePrefixIcon = () => {
    if (type === 'email') {
      return <EmailIcon />;
    } else {
      return <PersonIcon />;
    }
  };

  const handleErrorMessage = () => {
    let msg = '';

    if (name === 'email' && errors.email) {
      msg = errors.email.message as string;
    } else if (name === 'username' && errors.username) {
      msg = errors.username?.message as string;
    } else {
      msg = '';
    }

    return msg;
  };

  return (
    <FormControl sx={{ width: '100%' }}>
      <FormLabel>
        <Typography variant="h4" component="h5">
          {label}
        </Typography>
      </FormLabel>

      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            type={type}
            fullWidth
            placeholder={label}
            error={Boolean(name === 'email' ? errors.email : errors.username)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {handlePrefixIcon()}
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      <FormHelperText
        sx={{
          color: `${cmRedColor}`,
          fontWeight: 'bold',
          fontSize: '0.95rem',
          fontFamily: 'JosefinSans-Regular',
        }}
      >
        {handleErrorMessage()}
      </FormHelperText>
    </FormControl>
  );
};

export default CMInput;
