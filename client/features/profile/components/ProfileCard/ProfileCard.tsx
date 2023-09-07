import { useState, useCallback } from 'react';

import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';

import { UserDto } from '@/features/user';

const user: UserDto = {
  email: 'user@email.com',
  fullName: 'Full Name',
  id: '1337',
  backgroundUrl: 'https://media.tenor.com/6LyXLgF8ksUAAAAd/anime-gif.gif',
  avatarUrl: 'https://giffiles.alphacoders.com/350/35097.gif',
};

export const ProfileCard = () => {
  const [userData, setUserData] = useState(user);
  const [disabled, setDisabled] = useState(true);

  const toggleEditable = useCallback(() => setDisabled((prev) => !prev), []);

  const handleCancel = useCallback(() => {
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
        <Box display='flex' flexDirection='column' gap={2} my={2}>
          <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
            gap={0.5}
          >
            <Avatar src={userData?.avatarUrl} sx={{ height: 90, width: 90 }} />

            <TextField disabled={disabled} value={userData?.avatarUrl} label='Avatar url' />
          </Box>
          <Divider />
          <Box
            display='flex'
            flexDirection={{ xs: 'column', md: 'row' }}
            justifyContent='space-between'
            alignItems={{ xs: 'flex-start', md: 'center' }}
            gap={0.5}
          >
            <Typography variant='h5'>Full name:</Typography>
            <TextField
              disabled={disabled}
              value={userData.fullName}
              sx={{ width: { xs: '100%', md: 'auto' } }}
            />
          </Box>
          <Box
            display='flex'
            flexDirection={{ xs: 'column', md: 'row' }}
            justifyContent='space-between'
            alignItems={{ xs: 'flex-start', md: 'center' }}
            gap={0.5}
          >
            <Typography variant='h5'>Password:</Typography>
            <TextField disabled={disabled} sx={{ width: { xs: '100%', md: 'auto' } }} />
          </Box>
          <Box
            display='flex'
            flexDirection={{ xs: 'column', md: 'row' }}
            justifyContent='space-between'
            alignItems={{ xs: 'flex-start', md: 'center' }}
            gap={0.5}
          >
            <Typography variant='h5'>Confirm password:</Typography>
            <TextField disabled={disabled} sx={{ width: { xs: '100%', md: 'auto' } }} />
          </Box>
        </Box>
        <Divider />
        <Box display='flex' justifyContent='flex-end' mt={2} gap={2}>
          <Button variant='contained' color='error' disabled={disabled} onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant='contained' disabled={disabled}>
            Save
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
