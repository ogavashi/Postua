import { NextLinkComposed, Typography } from '@/components';
import { Box, Paper, useTheme } from '@mui/material';

export const NotificationsCard = () => {
  const theme = useTheme();

  return (
    <Paper sx={{ p: 2 }}>
      <Box
        display='flex'
        alignItems='center'
        gap={2}
        component={NextLinkComposed}
        to={{ pathname: '/news/123' }}
        sx={{ color: 'inherit', textDecoration: 'none' }}
      >
        <Box
          maxHeight={100}
          display={{ xs: 'none', lg: 'flex' }}
          component='img'
          alt='Post image'
          src={'https://gagadget.com/media/post_big/rhtjf.jpg'}
          sx={{ borderRadius: `${theme.shape.borderRadius}px` }}
        />
        <Box display='flex' flexDirection='column'>
          <Typography variant='h5' fontWeight={800}>
            Post title 1.
          </Typography>
          <Typography
            textAlign='justify'
            sx={{
              opacity: 0.6,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Typography>
        </Box>
        <Typography>12.09.2023 14:32</Typography>
      </Box>
    </Paper>
  );
};
