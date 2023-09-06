import { Avatar, Box, IconButton } from '@mui/material';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Typography } from '@/features/post';
import { NextLinkComposed } from '@/components';

export const Subscriber = () => {
  return (
    <Box
      my={2}
      display='flex'
      flexDirection='row'
      alignItems='center'
      justifyContent='space-between'
      component={NextLinkComposed}
      to={{ pathname: '/users/123' }}
      sx={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Box display='flex' flexDirection='row' alignItems='center' gap={1}>
        <Avatar>H</Avatar>
        <Typography fontWeight={800}>User Name</Typography>
      </Box>
      <IconButton color='primary'>
        <PersonAddIcon />
      </IconButton>
    </Box>
  );
};
