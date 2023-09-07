import { useTranslation } from 'next-i18next';

import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

import { Box, IconButton, Typography as MuiTypography, useTheme } from '@mui/material';

import { constants } from '@/common';
import { NextLinkComposed, Typography } from '@/components';

import { styles } from './style';

export const PostHeader = () => {
  const { t } = useTranslation();

  const theme = useTheme();

  return (
    <Box display='flex' alignItems='center' justifyContent='space-between' px={2} pt={2}>
      <Box display='flex' alignItems='center' gap={5}>
        <Box
          css={styles.root}
          component={NextLinkComposed}
          to={{ pathname: `/${constants.CATEGORIES[0].key}` }}
        >
          <IconButton color='primary' size='small' sx={{ borderRadius: theme.shape.borderRadius }}>
            <MuiTypography>
              {constants.CATEGORIES[0].icon} {t(`layout.categories.${constants.CATEGORIES[0].key}`)}
            </MuiTypography>
          </IconButton>
        </Box>
        <Typography
          component={NextLinkComposed}
          to={{ pathname: `/` }}
          display={{ xs: 'none', md: 'flex' }}
        >
          Author Name
        </Typography>
        <MuiTypography fontWeight={200} sx={{ opacity: 0.5 }}>
          6 hours
        </MuiTypography>
      </Box>
      <IconButton color='primary' size='small' sx={{ borderRadius: theme.shape.borderRadius }}>
        <LibraryAddIcon sx={{ mr: 1 }} />
        <MuiTypography>Subscribe</MuiTypography>
      </IconButton>
    </Box>
  );
};
