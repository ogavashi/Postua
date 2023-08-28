import { Box, Button, TextField, Typography } from '@mui/material';

interface RegisterTabProps {
  onToggle: () => void;
}

export const RegisterTab: React.FC<RegisterTabProps> = ({ onToggle }) => {
  return (
    <Box display='flex' flexDirection='column' gap={4} width='100%'>
      <Typography variant='h5' fontWeight={500}>
        Register
      </Typography>
      <TextField
        id='outlined-basic'
        label='Full name'
        variant='outlined'
        type='email'
        size='small'
      />
      <TextField id='outlined-basic' label='Email' variant='outlined' size='small' />
      <TextField
        id='outlined-basic'
        label='Password'
        variant='outlined'
        type='password'
        size='small'
      />
      <TextField
        id='outlined-basic'
        label='Confirm password'
        variant='outlined'
        type='password'
        size='small'
      />
      <Box gap={1}>
        <Button variant='outlined' fullWidth sx={{ mb: 3 }}>
          Login
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
