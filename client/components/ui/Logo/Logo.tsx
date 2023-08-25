import { SxProps, Theme } from '@mui/material/styles';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import BookIcon from '@mui/icons-material/Book';

import { styles } from './style';

interface LogoProps {
  sx?: SxProps<Theme>;
}

export const Logo: React.FC<LogoProps> = ({ sx = [] }) => {
  return (
    <Box sx={{ alignItems: 'center', ...sx }}>
      <BookIcon css={styles.icon} sx={{ mr: 1 }} />
      <Typography variant='h4' component='a' href='/' noWrap css={styles.logo} sx={{ flexGrow: 1 }}>
        Postua
      </Typography>
    </Box>
  );
};
