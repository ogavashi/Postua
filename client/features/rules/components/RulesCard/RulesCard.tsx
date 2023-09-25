import { Box, Button, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';

interface RulesCardProps {
  categoryKey: string;
}

export const RulesCard: React.FC<RulesCardProps> = ({ categoryKey }) => {
  const router = useRouter();

  const { t } = useTranslation();

  const handleNavigate = useCallback(() => {
    router.push(`${categoryKey}/rules`);
  }, [router]);

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
        <Button sx={{ mt: 2 }} onClick={handleNavigate}>
          {t('layout.ui.showAll')}
        </Button>
      </Box>
    </Paper>
  );
};
