import React, { useEffect } from 'react';

// Css Frame Work
import { Box } from '@mui/system';
import { Grid, List, ListItem, Typography } from '@mui/material';

// Form validation
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Global app types
import { IAuthForm, IUser } from '@src/utils/types/auth';

// State management
import { useAppSelector } from '@src/features/hooks/useStore';
// import { getAuthState } from '@src/features/store/slices/auth';

// App Languages
import { EN_US_LOCALE_TYPE, enUs, th } from '@src/features/languages';

// Components
import NInput from '@src/components/ui/NInput';
import CMButton from '@src/components/ui/CMButton';

interface Props {
  // user: IUser | null | undefined;
  handleSubmitForm: (value: IAuthForm) => void;
}

const role = ['Admin', 'User'];
const sex = ['male', 'female'];

/*************************************************************************
 *                            MAIN METHOD
 ************************************************************************/
const EditFormProfile = ({ handleSubmitForm }: Props) => {
  const { appLang } = useAppSelector((state) => state.ui);
  const { user } = useAppSelector((state) => state.auth);
  // const dispatch = useAppDispatch();

  const { authPage: authPageLangObj } =
    appLang === EN_US_LOCALE_TYPE ? enUs : th;
  const {
    dashboardPage: { drawerMenu },
  } = appLang === EN_US_LOCALE_TYPE ? enUs : th;
  const pageLangObj = drawerMenu.account;

  const schema = yup.object().shape({
    username: yup.string().required(authPageLangObj.uNameRequired),
    email: yup
      .string()
      .required(authPageLangObj.emailRequired)
      .email(authPageLangObj.emailValidType),
    address: yup.string().required(authPageLangObj.addressRequired),
    role: yup.string().required(authPageLangObj.roleRequired),
    sex: yup.string().required(authPageLangObj.sexRequired),
    mobile: yup.string().required(authPageLangObj.mobileRequired),
    age: yup.number().required(authPageLangObj.ageRequired),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthForm>({
    resolver: yupResolver(schema),
    // defaultValues: {
    //   username: user?.username ? user.username : '',
    //   email: user?.email ? user.email : '',
    //   role: user?.role ? user.role : '',
    //   mobile: user?.credentials?.mobile
    //     ? (`0${user.credentials.mobile}` as string)
    //     : '',
    //   sex: user?.credentials?.sex ? user.credentials.sex : '',
    //   age: user?.credentials?.age ? parseInt(user.credentials.age) : 0,
    //   address: user?.credentials?.address
    //     ? (user.credentials.address as string)
    //     : '',
    // },
  });

  const handleOnSubmitForm: SubmitHandler<IAuthForm> = (data) => {
    handleSubmitForm(data);
  };

  return (
    <Grid item xs={12} md={8}>
      <Box
        sx={{
          p: 3,
        }}
      >
        <Typography variant="h3" component="h5">{`Credential`}</Typography>

        <form onSubmit={handleSubmit(handleOnSubmitForm)}>
          <List>
            <ListItem>
              <NInput
                type="text"
                editBoxType="text"
                name="username"
                control={control}
                label={pageLangObj.username}
                isShowLabel={false}
                defaultValue={user?.username ? user.username : ''}
                errors={errors}
              />
            </ListItem>

            <ListItem>
              <NInput
                type="email"
                editBoxType="text"
                name="email"
                control={control}
                label={pageLangObj.email}
                isShowLabel={false}
                defaultValue={user?.email ? user.email : ''}
                errors={errors}
              />
            </ListItem>

            <ListItem sx={{ mt: 2 }}>
              <NInput
                type="text"
                editBoxType="selector"
                valueObj={role}
                name="role"
                control={control}
                label={pageLangObj.role}
                isShowLabel={true}
                defaultValue={user?.role ? user.role : ''}
                errors={errors}
              />

              <Box sx={{ mx: 1 }} />

              <NInput
                type="text"
                editBoxType="selector"
                valueObj={sex}
                name="sex"
                control={control}
                label={pageLangObj.sex}
                isShowLabel={true}
                defaultValue={
                  user?.credentials?.sex ? (user.credentials.sex as string) : ''
                }
                errors={errors}
              />
            </ListItem>

            <ListItem>
              <NInput
                type="text"
                editBoxType="text"
                name="mobile"
                control={control}
                label={pageLangObj.mobile}
                isShowLabel={false}
                defaultValue={
                  user?.credentials?.mobile
                    ? (`0${user.credentials.mobile}` as string)
                    : ''
                }
                errors={errors}
              />
              <Box sx={{ mx: 1 }} />

              <NInput
                type="number"
                editBoxType="text"
                name="age"
                control={control}
                label={pageLangObj.age}
                isShowLabel={false}
                defaultValue={
                  user?.credentials?.age ? parseInt(user.credentials.age) : 0
                }
                errors={errors}
              />
            </ListItem>

            <ListItem>
              <NInput
                type="text"
                editBoxType="text"
                name="address"
                control={control}
                label={pageLangObj.address}
                isShowLabel={false}
                defaultValue={
                  user?.credentials?.address
                    ? (user.credentials.address as string)
                    : ''
                }
                multiLine
                errors={errors}
              />
            </ListItem>

            <ListItem>
              <CMButton
                buttonType="submit"
                variant="contained"
                label={pageLangObj.saveEditFormButton}
                color="primary"
                fullWidth={false}
                horizontalAlignment="flex-end"
                borderRadius={0.5}
                marginTop={0.75}
                marginBottom={0}
              />
            </ListItem>
          </List>
        </form>
      </Box>
    </Grid>
  );
};

export default EditFormProfile;
