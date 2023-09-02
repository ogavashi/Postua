import { useCallback, useState } from 'react';

import Link from 'next/link';

import { Box, IconButton, Typography, useTheme } from '@mui/material';

import InsertCommentIcon from '@mui/icons-material/InsertComment';

export const Item = () => {
  const [isHover, setIsHover] = useState(false);

  const toggleHover = useCallback(() => {
    setIsHover((prev) => !prev);
  }, []);

  const theme = useTheme();

  return (
    <Box mb={2} width='100%'>
      <Typography textAlign='justify'>
        <Link
          href={'news/123'}
          style={{
            color: isHover ? theme.palette.primary.main : 'inherit',
            textDecoration: 'none',
            transition: '0.3s',
          }}
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies maximus risus vel
          mattis. Nunc mi augue, rutrum ac erat eu, imperdiet tristique lorem. Sed vitae aliquam
          purus
        </Link>
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
          <Typography>15</Typography>
        </IconButton>
      </Typography>
    </Box>
  );
};
