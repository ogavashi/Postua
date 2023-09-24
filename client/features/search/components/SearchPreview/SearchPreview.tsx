import { useRef } from 'react';

import { SearchResults } from '@/types';
import { List, ListItem, Paper } from '@mui/material';
import { SearchItem } from '../SearchItem';
import { ListItemButton } from '../ListItemButton';
import { NextLinkComposed, Typography } from '@/components';

import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';

interface SearchPreviewProps {
  data: SearchResults | null;
  searchValue: string;
  showPreview: boolean;
}

export const SearchPreview: React.FC<SearchPreviewProps> = ({ data, searchValue, showPreview }) => {
  return (
    showPreview && (
      <Paper
        sx={{
          position: 'absolute',
          width: 300,
          mt: 1,
          zIndex: 10,
        }}
      >
        <List>
          {data?.slice(0, 4).map((item, index) => (
            <SearchItem item={item} key={index} />
          ))}
          <ListItem>
            <ListItemButton>
              <SubdirectoryArrowLeftIcon color='primary' sx={{ mr: 0.5 }} />
              <Typography component={NextLinkComposed} to={{ pathname: `/search/${searchValue}` }}>
                Show results
              </Typography>
            </ListItemButton>
          </ListItem>
        </List>
      </Paper>
    )
  );
};
