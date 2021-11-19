import React from 'react';

// CSS Frame Work
import {
  FormControl,
  FormHelperText,
  FormLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/AttachEmail';
import PersonIcon from '@mui/icons-material/Person';
import RoleIcon from '@mui/icons-material/SupervisorAccount';
import AddressIcon from '@mui/icons-material/AccountBalance';
import AgeIcon from '@mui/icons-material/AlarmAdd';
import SexIcon from '@mui/icons-material/Person';
import MobileNoIcon from '@mui/icons-material/PhoneAndroid';

// Global types
import { IAuthForm } from '@src/utils/types/auth';

// Form validation
import { Controller, Control, FieldError } from 'react-hook-form';

// Colors system
import { cmRedColor } from '@src/utils/colorsType';

type Errors = {
  username?: FieldError | undefined;
  email?: FieldError | undefined;
  role?: FieldError | undefined;
  address?: FieldError | undefined;
  mobile?: FieldError | undefined;
  age?: FieldError | undefined;
  sex?: FieldError | undefined;
};

interface Props {
  control: Control<IAuthForm, object>;
  name: 'username' | 'email' | 'role' | 'address' | 'age' | 'sex' | 'mobile';
  type: 'text' | 'email' | 'number';
  editBoxType: 'text' | 'selector';
  valueObj?: Array<string | number>;
  defaultValue: string | number;
  label: string;
  isShowLabel: boolean;
  multiLine?: boolean;
  errors: Errors;
}

/*************************************************************************
 *                            MAIN METHOD
 ************************************************************************/
const NInput = ({
  control,
  name,
  type,
  editBoxType,
  valueObj,
  defaultValue,
  label,
  isShowLabel,
  multiLine,
  errors,
}: Props) => {
  const handlePrefixIcon = () => {
    switch (name) {
      case 'username':
        return <PersonIcon />;

      case 'email':
        return <EmailIcon />;

      case 'role':
        return <RoleIcon />;

      case 'age':
        return <AgeIcon />;

      case 'sex':
        return <SexIcon />;

      case 'address':
        return <AddressIcon />;

      case 'mobile':
        return <MobileNoIcon />;
    }
  };

  const handleErrorMessage = () => {
    let msg = '';

    if (name === 'email' && errors.email) {
      msg = errors.email.message as string;
    } else if (name === 'username' && errors.username) {
      msg = errors.username?.message as string;
    } else if (name === 'role' && errors.role) {
      msg = errors.role?.message as string;
    } else if (name === 'address' && errors.address) {
      msg = errors.address?.message as string;
    } else if (name === 'age' && errors.age) {
      msg = errors.age?.message as string;
    } else if (name === 'sex' && errors.sex) {
      msg = errors.sex?.message as string;
    } else if (name === 'mobile' && errors.mobile) {
      msg = errors.mobile?.message as string;
    } else {
      msg = '';
    }

    return msg;
  };

  const handleEditBoxTextType = () => {
    return (
      <FormControl sx={{ width: '100%' }}>
        {isShowLabel && (
          <FormLabel>
            <Typography variant="h4" component="h5">
              {label}
            </Typography>
          </FormLabel>
        )}

        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <TextField
              {...field}
              type={type}
              multiline={multiLine}
              rows={multiLine ? 3 : 1}
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

  const handleSelectorListType = () => {
    return valueObj?.map((val, index) => (
      <MenuItem key={index} value={val}>
        {val}
      </MenuItem>
    ));
  };

  const handleEditBoxSelectorType = () => {
    return (
      <FormControl sx={{ width: '100%' }}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>

        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <Select {...field} labelId="demo-simple-select-label" label={label}>
              {handleSelectorListType()}
            </Select>
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

  if (editBoxType === 'selector') {
    return handleEditBoxSelectorType();
  } else {
    return handleEditBoxTextType();
  }
};

export default NInput;
