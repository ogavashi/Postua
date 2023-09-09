import { useCallback, useState } from 'react';

import { useTranslation } from 'next-i18next';

import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { FormField, LoginDto, loginSchema } from '@/features/auth';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslatedErrors } from '@/hooks';

interface LoginTabProps {
  onToggle: () => void;
}

export const LoginTab: React.FC<LoginTabProps> = ({ onToggle }) => {
  const methods = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(loginSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const translatedErrors = useTranslatedErrors(errors);

  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = useCallback(() => setShowPassword((show) => !show), []);

  const onSubmit = useCallback((data: LoginDto) => {
    console.log(data);
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
          {t('layout.ui.login')}
        </Typography>
        <FormField
          fieldKey='email'
          type='email'
          errors={errors}
          translatedErrors={translatedErrors}
        />
        <FormField
          fieldKey='password'
          errors={errors}
          translatedErrors={translatedErrors}
          type={showPassword ? 'text' : 'password'}
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
        <Box gap={1}>
          <Button type='submit' variant='outlined' fullWidth sx={{ mb: 3 }}>
            {t('layout.ui.login')}
          </Button>
          <Box display='flex' alignItems='center' gap={1}>
            <Typography> {t('layout.ui.noAccount')}</Typography>
            <Button onClick={onToggle} variant='text'>
              {t('layout.ui.register')}
            </Button>
          </Box>
        </Box>
      </Box>
    </FormProvider>
  );
};
