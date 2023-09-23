import { NextLinkComposed } from '@/components';
import { User } from '@/types';
import { Avatar, Box } from '@mui/material';

interface SubsciberProps {
  user: User;
}

export const Subscriber: React.FC<SubsciberProps> = ({ user }) => {
  return (
    <Box component={NextLinkComposed} to={{ pathname: `/user/${user.id}` }}>
      {user?.avatarUrl ? <Avatar src={user.avatarUrl} /> : <Avatar>{user.fullName[0]}</Avatar>}
    </Box>
  );
};
