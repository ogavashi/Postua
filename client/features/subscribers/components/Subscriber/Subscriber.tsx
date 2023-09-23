import { Avatar, Box, IconButton } from '@mui/material';

import StarsIcon from '@mui/icons-material/Stars';

import { NextLinkComposed, Typography } from '@/components';
import { User } from '@/types';

interface SubscriberProps {
  user: User;
}

export const Subscriber: React.FC<SubscriberProps> = ({ user }) => {
  return (
    <Box
      my={2}
      display='flex'
      flexDirection='row'
      alignItems='center'
      justifyContent='space-between'
      component={NextLinkComposed}
      to={{ pathname: `/user/${user.id}` }}
      sx={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Box display='flex' flexDirection='row' alignItems='center' gap={1}>
        {user?.avatarUrl ? <Avatar src={user.avatarUrl} /> : <Avatar>{user.fullName[0]}</Avatar>}
        <Typography fontWeight={800}>{user.fullName}</Typography>
        {user.role.id > 1 && <StarsIcon color='warning' />}
      </Box>
    </Box>
  );
};
