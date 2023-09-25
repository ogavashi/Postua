import { Box, Paper, Typography } from '@mui/material';

import { useTranslation } from 'next-i18next';

export const Rules = () => {
  const { t } = useTranslation();

  return (
    <Paper
      sx={{
        p: 2,
      }}
    >
      <Box>
        <Typography variant='h6' gutterBottom>
          {t('layout.ui.rules')}
        </Typography>
        <Typography textAlign='justify' gutterBottom>
          1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Typography>
        <Typography textAlign='justify'>
          2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Typography>
      </Box>
    </Paper>
  );
};
