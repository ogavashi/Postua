import { Box, IconButton, Typography as MuiTypography, useTheme } from '@mui/material';

import InsertCommentIcon from '@mui/icons-material/InsertComment';
import { NextLinkComposed } from '@/components';
import { Typography } from './Typoghraphy.styled';

export const Item = () => {
  const theme = useTheme();

  return (
    <Box mb={2} width='100%'>
      <MuiTypography textAlign='justify'>
        <Typography component={NextLinkComposed} to={{ pathname: 'news/123' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies maximus risus vel
          mattis. Nunc mi augue, rutrum ac erat eu, imperdiet tristique lorem. Sed vitae aliquam
          purus
        </Typography>
        <IconButton
          size='small'
          color='primary'
          sx={{
            position: 'relative',
            py: 0.1,
            borderRadius: theme.shape.borderRadius,
            ml: 0.5,
          }}
        >
          <InsertCommentIcon sx={{ fontSize: 16, position: 'relative', mr: 0.5 }} />
          <MuiTypography>15</MuiTypography>
        </IconButton>
      </MuiTypography>
    </Box>
  );
};
