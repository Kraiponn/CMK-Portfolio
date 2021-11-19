import React, { useState } from 'react';

// CSS frame work
import {
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VPNKeyIcon from '@mui/icons-material/VpnKey';

// Form validation
import { Controller, Control, FieldError } from 'react-hook-form';

// Colors system
import { cmRedColor } from '@src/utils/colorsType';

// Global types
import { IAuthForm } from '@src/utils/types/auth';

// Define error type for input
type Errors = {
  password?: FieldError | undefined;
  confirmPassword?: FieldError | undefined;
};

interface Props {
  control: Control<IAuthForm, object>;
  name: 'password' | 'confirmPassword';
  label: string;
  errors: Errors;
}

/*************************************************************************
 *                            MAIN METHOD
 ************************************************************************/
const NPwdInput = ({ control, name, label, errors }: Props) => {
  const [visible, setVisible] = React.useState<boolean>(false);

  const handleErrorMessage = () => {
    let msg = '';

    if (name === 'password' && errors.password) {
      msg = errors.password.message as string;
    } else if (name === 'confirmPassword' && errors.confirmPassword) {
      msg = errors.confirmPassword?.message as string;
    } else {
      msg = '';
    }

    return msg;
  };

  const handleToggleDisplayPwd = () => {
    setVisible(!visible);
  };

  return (
    <FormControl sx={{ width: '100%' }} variant="outlined">
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
          <OutlinedInput
            {...field}
            // id="outlined-adornment-amount"
            type={visible ? 'text' : 'password'}
            fullWidth
            startAdornment={
              <InputAdornment position="start">
                <VPNKeyIcon></VPNKeyIcon>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  // aria-label="toggle password visibility"
                  onClick={handleToggleDisplayPwd}
                  edge="end"
                >
                  {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            }
            placeholder={label}
            error={Boolean(
              name === 'password' ? errors.password : errors.confirmPassword
            )}
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

export default NPwdInput;
