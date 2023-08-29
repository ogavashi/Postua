import { useCallback, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';

import { RegisterDto, registerSchema } from '@/features/auth';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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

  const [showPassword, setShowPassword] = useState(false);

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
        Register
      </Typography>
      <TextField
        id='fullName'
        label='Full name'
        variant='outlined'
        type='email'
        size='small'
        helperText={errors?.fullName?.message || ' '}
        error={!!errors?.fullName}
        {...register('fullName')}
      />
      <TextField
        id='outlined-basic'
        label='Email'
        variant='outlined'
        size='small'
        helperText={errors?.email?.message || ' '}
        error={!!errors?.email}
        {...register('email')}
      />
      <TextField
        id='password'
        label='Password'
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
        helperText={errors?.password?.message || ' '}
        error={!!errors?.password}
        {...register('password')}
      />
      <TextField
        id='confirmPassword'
        label='Confirm password'
        variant='outlined'
        type={showPassword ? 'text' : 'password'}
        size='small'
        autoComplete='true'
        helperText={errors?.confirmPassword?.message || ' '}
        error={!!errors?.confirmPassword}
        {...register('confirmPassword')}
      />
      <Box gap={1}>
        <Button type='submit' variant='outlined' fullWidth sx={{ mb: 3 }}>
          Register
        </Button>
        <Box display='flex' alignItems='center' gap={1}>
          <Typography>Already have an account?</Typography>
          <Button onClick={onToggle} variant='text'>
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
