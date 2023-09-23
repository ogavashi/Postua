import { Box, Paper } from '@mui/material';

import { Background } from './Background';
import { Header } from './Header';
import { UserData } from '@/types';

interface UserProps {
  user: UserData;
  subsCount: number;
}

export const User: React.FC<UserProps> = ({ user, subsCount }) => {
  return (
    <Paper>
      <Box>
        <Background url={user?.backgroundUrl} />
        <Header user={user} subsCount={subsCount} />
      </Box>
    </Paper>
  );
};
