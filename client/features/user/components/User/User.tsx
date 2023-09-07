import { Box, Paper } from '@mui/material';

import { Background } from './Background';
import { Header } from './Header';
import { UserDto } from '@/features/user';

interface UserProps {
  user: UserDto;
}

export const User: React.FC<UserProps> = ({ user }) => {
  return (
    <Paper>
      <Box>
        <Background url={user.backgroundUrl} />
        <Header user={user} />
      </Box>
    </Paper>
  );
};
