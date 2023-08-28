import { Box, Button, TextField, Typography } from '@mui/material';

interface LoginTabProps {
  onToggle: () => void;
}

export const LoginTab: React.FC<LoginTabProps> = ({ onToggle }) => {
  return (
    <Box display='flex' flexDirection='column' gap={4} width='100%'>
      <Typography variant='h5' fontWeight={500}>
        Login
      </Typography>
      <TextField id='outlined-basic' label='Email' variant='outlined' type='email' size='small' />
      <TextField
        id='outlined-basic'
        label='Password'
        variant='outlined'
        type='password'
        size='small'
      />
      <Box gap={1}>
        <Button variant='outlined' fullWidth sx={{ mb: 3 }}>
          Login
        </Button>
        <Box display='flex' alignItems='center' gap={1}>
          <Typography>Don't have an account?</Typography>
          <Button onClick={onToggle} variant='text'>
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
