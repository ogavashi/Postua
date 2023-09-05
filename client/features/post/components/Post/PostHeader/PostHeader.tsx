import { useTranslation } from 'next-i18next';

import { Box, IconButton, Typography as MuiTypography, useTheme } from '@mui/material';

import { styles } from './style';
import { NextLinkComposed } from '@/components';
import { constants } from '@/common';
import { Typography } from '@/features/post';

export const PostHeader = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box px={2} pt={2}>
      <Box display='flex' alignItems='center' gap={{ xs: 2, md: 5 }}>
        <Box
          css={styles.root}
          component={NextLinkComposed}
          to={{ pathname: `/${constants.CATEGORIES[0].key}` }}
        >
          <IconButton color='primary' sx={{ borderRadius: theme.shape.borderRadius }}>
            <MuiTypography>
              {constants.CATEGORIES[0].icon} {t(`layout.categories.${constants.CATEGORIES[0].key}`)}
            </MuiTypography>
          </IconButton>
        </Box>
        <Typography component={NextLinkComposed} to={{ pathname: `/` }}>
          Author Name
        </Typography>
        <MuiTypography fontWeight={200} sx={{ opacity: 0.5 }}>
          6 hours
        </MuiTypography>
      </Box>
      <Box>
        <Typography
          textAlign='justify'
          variant='h6'
          component={NextLinkComposed}
          fontWeight={800}
          to={{ pathname: `/games/123` }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </Typography>
      </Box>
    </Box>
  );
};
