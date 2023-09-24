import { Box, IconButton, Typography as MuiTypography, useTheme } from '@mui/material';

import { NextLinkComposed } from '@/components';
import { Typography } from './Typoghraphy.styled';

interface ItemProps {
  isLast?: boolean;
}

export const Item: React.FC<ItemProps> = ({ isLast }) => {
  const theme = useTheme();

  return (
    <Box mb={isLast ? 1 : 2} width='100%'>
      <MuiTypography textAlign='justify'>
        <Typography component={NextLinkComposed} to={{ pathname: 'news/123' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies maximus risus vel
          mattis. Nunc mi augue, rutrum ac erat eu, imperdiet tristique lorem. Sed vitae aliquam
          purus
        </Typography>
      </MuiTypography>
    </Box>
  );
};
