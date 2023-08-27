import { useTheme } from '@emotion/react';

import { SxProps, Theme } from '@mui/material/styles';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import BookIcon from '@mui/icons-material/Book';

import { styles } from './style';

interface LogoProps {
  sx?: SxProps<Theme>;
}

export const Logo: React.FC<LogoProps> = ({ sx = [] }) => {
  const theme = useTheme();

  return (
    <Box css={styles.root} component='a' href='/' sx={{ alignItems: 'center', ...sx }}>
      <BookIcon css={styles.icon} color='secondary' sx={{ mr: 1 }} />
      <Typography variant='h4' noWrap css={styles.logo} color='secondary' sx={{ flexGrow: 1 }}>
        Postua
      </Typography>
    </Box>
  );
};
