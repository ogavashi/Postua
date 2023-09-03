import { useCallback, useState } from 'react';

import { useTranslation } from 'next-i18next';

import { yupResolver } from '@hookform/resolvers/yup';
import { FieldError, useForm } from 'react-hook-form';

import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';

import { Visibility, VisibilityOff } from '@mui/icons-material';

import { RegisterDto, registerSchema } from '@/features/auth';
import { useFormatError } from '@/hooks';

interface RegisterTabProps {
  onToggle: () => void;
}

export const RegisterTab: React.FC<RegisterTabProps> = ({ onToggle }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(registerSchema),
  });

  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);

  const formatErrorMessage = useFormatError();

  const handleClickShowPassword = useCallback(() => setShowPassword((show) => !show), []);

  const onSubmit = useCallback((data: RegisterDto) => {
    console.log(data);
  }, []);

  return (
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
      <TextField
        id='fullName'
        label={t('layout.ui.fullName')}
        variant='outlined'
        type='email'
        size='small'
        helperText={formatErrorMessage(errors?.fullName?.message) || ' '}
        error={!!errors?.fullName}
        {...register('fullName')}
      />
      <TextField
        id='outlined-basic'
        label={t('layout.ui.email')}
        variant='outlined'
        size='small'
        helperText={formatErrorMessage(errors?.email?.message) || ' '}
        error={!!errors?.email}
        {...register('email')}
      />
      <TextField
        id='password'
        label={t('layout.ui.password')}
        variant='outlined'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={handleClickShowPassword} edge='end' color='primary'>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        type={showPassword ? 'text' : 'password'}
        size='small'
        autoComplete='true'
        helperText={formatErrorMessage(errors?.password?.message) || ' '}
        error={!!errors?.password}
        {...register('password')}
      />
      <TextField
        id='confirmPassword'
        label={t('layout.ui.confirmPassword')}
        variant='outlined'
        type={showPassword ? 'text' : 'password'}
        size='small'
        autoComplete='true'
        helperText={formatErrorMessage(errors?.confirmPassword?.message) || ' '}
        error={!!errors?.confirmPassword}
        {...register('confirmPassword')}
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
  );
};
