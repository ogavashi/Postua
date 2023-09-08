import { useState, useCallback } from 'react';

import dynamic from 'next/dynamic';

import { Box, Button, Paper, TextField, Select } from '@mui/material';
import { OutputData } from '@editorjs/editorjs';
import { MenuItem } from '@/components';
import { constants } from '@/common';
import { useTranslation } from 'next-i18next';

const Editor = dynamic(() => import('../../../editor').then((m) => m.Editor), { ssr: false });

export const WriteForm = () => {
  const [blocks, setBlocks] = useState<OutputData>();

  const { t } = useTranslation();

  const CategorySelect = () => (
    <Select label='Category' size='small' sx={{ minWidth: 170 }} color='primary' value='news'>
      <MenuItem key='news' value='news' color='primary'>
        News
      </MenuItem>
      {constants.CATEGORIES.map((category) => (
        <MenuItem key={category.key} value={category.key} color='primary'>
          {t(`layout.categories.${category.key}`)}
        </MenuItem>
      ))}
    </Select>
  );

  return (
    <Paper>
      <Box display='flex' flexDirection='column' gap={2} py={2}>
        <Box px={2}>
          <TextField fullWidth label='Post title' />
        </Box>
        <Box
          sx={{ backgroundColor: '#edf2f7', color: 'black', overflowY: 'scroll' }}
          height='calc(100vh - 300px)'
        >
          <Box>
            <Editor data={blocks} onChange={setBlocks} holder='editorjs-container' />
          </Box>
        </Box>
        <Box px={2}>
          <TextField
            fullWidth
            label='Tags'
            size='small'
            sx={{ display: { xs: 'flex', lg: 'none' } }}
          />
        </Box>
        <Box display='flex' justifyContent='space-between' px={2}>
          <Box display='flex' gap={1}>
            <TextField
              fullWidth
              label='Tags'
              size='small'
              sx={{ display: { xs: 'none', lg: 'flex' } }}
            />
            <CategorySelect />
          </Box>
          <Button variant='contained'>Save</Button>
        </Box>
      </Box>
    </Paper>
  );
};
