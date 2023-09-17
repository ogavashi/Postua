import { useState, useCallback } from 'react';

import { useTranslation } from 'next-i18next';

import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';

import { FormProvider, useForm } from 'react-hook-form';
import { normalizeUserData, updateSchema } from '@/features/profile';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormField } from '@/features/auth';
import { useTranslatedErrors } from '@/hooks';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { UserData, UserResponse } from '@/types';
import { ApiService } from '@/services';
import { useSnackbar } from 'notistack';

type ProfileCard = {
  user: UserData;
};

export const ProfileCard: React.FC<ProfileCard> = ({ user }) => {
  const [disabled, setDisabled] = useState(true);

  const { t } = useTranslation();

  const [userData, setUserData] = useState(user);

  const toggleEditable = useCallback(() => setDisabled((prev) => !prev), []);

  const handleChange = useCallback((key: string, value: string) => {
    setUserData((prev: any) => ({ ...prev, [key]: value }));
  }, []);

  const methods = useForm({
    mode: 'onSubmit',
    defaultValues: userData as any,
    resolver: yupResolver(updateSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const translatedErrors = useTranslatedErrors(errors);

  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleClickShowPassword = useCallback(() => setShowPassword((show) => !show), []);

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = useCallback(
    async (data: any) => {
      const updatedUser = normalizeUserData({
        ...data,
        avatarUrl: userData.avatarUrl,
        backgroundUrl: userData.backgroundUrl,
      });

      try {
        setIsLoading(true);

        await ApiService.user.update(updatedUser);
        enqueueSnackbar('Successfully updated profile', { variant: 'success' });
      } catch (error) {
        enqueueSnackbar('Failed to update profile', { variant: 'error' });
      } finally {
        toggleEditable();
        setIsLoading(false);
      }
    },
    [userData]
  );

  const handleCancel = useCallback(() => {
    methods.reset();
    setDisabled(true);
  }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Box>
        <Box display='flex' justifyContent='space-between' alignItems='center' mb={1}>
          <Typography variant='h4'>Profile</Typography>
          {disabled && (
            <IconButton color='primary' onClick={toggleEditable}>
              <EditIcon />
            </IconButton>
          )}
        </Box>
        <Divider />
        <FormProvider {...methods}>
          <Box component='form' onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={disabled} style={{ border: 0, padding: 0 }}>
              <Box display='flex' flexDirection='column' gap={2} my={2}>
                <Box
                  display='flex'
                  flexDirection='row'
                  justifyContent='space-between'
                  alignItems='center'
                  gap={2}
                >
                  <Avatar
                    src={userData?.avatarUrl}
                    alt={userData?.fullName[0] || 'A'}
                    sx={{ height: 90, width: 90 }}
                  />

                  <TextField
                    disabled={disabled}
                    value={userData?.avatarUrl}
                    onChange={(e) => handleChange('avatarUrl', e.target.value)}
                    label='Avatar url'
                    size='small'
                    sx={{ width: { xs: '100%', lg: 250 } }}
                  />
                </Box>
                <Box
                  display='flex'
                  flexDirection='row'
                  justifyContent='space-between'
                  alignItems='center'
                  gap={2}
                >
                  <Box
                    component='img'
                    src={userData?.backgroundUrl}
                    alt='Background image'
                    sx={{ width: 90 }}
                  />
                  <TextField
                    disabled={disabled}
                    value={userData?.backgroundUrl}
                    onChange={(e) => handleChange('backgroundUrl', e.target.value)}
                    label='Background url'
                    size='small'
                    sx={{ width: { xs: '100%', lg: 250 } }}
                  />
                </Box>
                <Divider />
                <Box
                  display='flex'
                  flexDirection={{ xs: 'column', md: 'row' }}
                  justifyContent='space-between'
                  alignItems={{ xs: 'flex-start', md: 'center' }}
                  gap={1}
                >
                  <Typography variant='h5' mb={{ xs: 0, lg: 5 }}>
                    {t(`layout.ui.fullName`)}:
                  </Typography>
                  <FormField
                    fieldKey='fullName'
                    errors={errors}
                    translatedErrors={translatedErrors}
                    sx={{ width: { xs: '100%', lg: 250 }, height: { xs: 'auto', lg: 85 } }}
                  />
                </Box>
                <Box
                  display='flex'
                  flexDirection={{ xs: 'column', md: 'row' }}
                  justifyContent='space-between'
                  alignItems={{ xs: 'flex-start', md: 'center' }}
                  gap={1}
                >
                  <Typography variant='h5' mb={{ xs: 0, lg: 5 }}>
                    {t(`layout.ui.password`)}:
                  </Typography>
                  <FormField
                    fieldKey='password'
                    errors={errors}
                    translatedErrors={translatedErrors}
                    type={showPassword ? 'text' : 'password'}
                    sx={{ width: { xs: '100%', lg: 250 }, height: { xs: 'auto', lg: 85 } }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton onClick={handleClickShowPassword} edge='end' color='primary'>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box
                  display='flex'
                  flexDirection={{ xs: 'column', md: 'row' }}
                  justifyContent='space-between'
                  alignItems={{ xs: 'flex-start', md: 'center' }}
                  gap={1}
                >
                  <Typography variant='h5' mb={{ xs: 0, lg: 2 }}>
                    {t(`layout.ui.confirmPassword`)}:
                  </Typography>
                  <FormField
                    fieldKey='confirmPassword'
                    errors={errors}
                    translatedErrors={translatedErrors}
                    type={showPassword ? 'text' : 'password'}
                    sx={{ width: { xs: '100%', lg: 250 } }}
                  />
                </Box>
              </Box>
              <Divider />
              <Box display='flex' justifyContent='flex-end' mt={2} gap={2}>
                <Button
                  variant='contained'
                  color='error'
                  disabled={disabled || isLoading}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button variant='contained' disabled={disabled || isLoading} type='submit'>
                  Save
                </Button>
              </Box>
            </fieldset>
          </Box>
        </FormProvider>
      </Box>
    </Paper>
  );
};
