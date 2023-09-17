import { useCallback, useState } from 'react';

import { useTranslation } from 'next-i18next';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';

import { Visibility, VisibilityOff } from '@mui/icons-material';

import { setCookie } from 'nookies';

import { FormField, RegisterDto, registerSchema } from '@/features/auth';
import { useTranslatedErrors } from '@/hooks';
import { RegisterRequest } from '@/types';
import { ApiService } from '@/services';
import { useAppDispatch } from '@/store';
import { userActions } from '@/features/user';

interface RegisterTabProps {
  onToggle: () => void;
  handleClose: () => void;
}

export const RegisterTab: React.FC<RegisterTabProps> = ({ onToggle, handleClose }) => {
  const methods = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(registerSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const translatedErrors = useTranslatedErrors(errors);

  const handleClickShowPassword = useCallback(() => setShowPassword((show) => !show), []);

  const onSubmit = useCallback(async (dto: RegisterRequest) => {
    try {
      const data = await ApiService.user.register(dto);

      const { token, user } = data;

      dispatch(userActions.setUser(user));

      setCookie(null, 'postUaToken', token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      handleClose();
    } catch (error) {}
  }, []);
  return (
    <FormProvider {...methods}>
      <Box
        component='form'
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        display='flex'
        flexDirection='column'
        gap={2}
        width='100%'
      >
        <Typography gutterBottom variant='h5' fontWeight={500}>
          {t('layout.ui.register')}
        </Typography>
        <FormField fieldKey='fullName' errors={errors} translatedErrors={translatedErrors} />
        <FormField
          fieldKey='email'
          type='email'
          errors={errors}
          translatedErrors={translatedErrors}
        />
        <FormField
          fieldKey='password'
          type={showPassword ? 'text' : 'password'}
          errors={errors}
          translatedErrors={translatedErrors}
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
        <FormField
          fieldKey='confirmPassword'
          type={showPassword ? 'text' : 'password'}
          errors={errors}
          translatedErrors={translatedErrors}
        />
        <Box gap={1}>
          <Button type='submit' variant='outlined' fullWidth sx={{ mb: 3 }}>
            {t('layout.ui.register')}
          </Button>
          <Box display='flex' alignItems='center' gap={1}>
            <Typography> {t('layout.ui.haveAccount')}</Typography>
            <Button onClick={onToggle} variant='text'>
              {t('layout.ui.login')}
            </Button>
          </Box>
        </Box>
      </Box>
    </FormProvider>
  );
};
