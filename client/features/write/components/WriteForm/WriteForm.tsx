import { useState, useCallback } from 'react';

import dynamic from 'next/dynamic';

import { Box, Button, Paper, TextField, Select, SelectChangeEvent } from '@mui/material';
import { OutputData } from '@editorjs/editorjs';
import { MenuItem } from '@/components';
import { constants } from '@/common';
import { useTranslation } from 'next-i18next';
import { useAppSelector } from '@/store';
import { userSelectors } from '@/features/user';
import { PostDto, PostItem, PostUpdateDto } from '@/types';
import { useToast } from '@/features/toast';
import { ApiService } from '@/services';
import { useRouter } from 'next/router';

const Editor = dynamic(() => import('../../../editor').then((m) => m.Editor), { ssr: false });

interface WriteFormProps {
  data?: PostItem;
}

type Errors = {
  [key in string]: string;
};

export const WriteForm: React.FC<WriteFormProps> = ({ data }) => {
  const [blocks, setBlocks] = useState(data?.body);
  const [postData, setPostData] = useState({
    title: data?.title || '',
    tags: data?.tags.join(' ') || '',
    image: data?.image || '',
    category: constants.CATEGORIES[0].key,
  });
  const [erros, setErrors] = useState<Errors>({});

  const activeUserRole = useAppSelector(userSelectors.data)?.role.id || 0;

  const { t } = useTranslation();

  const { toastError } = useToast();

  const router = useRouter();

  const handleSelectCategory = useCallback(
    (event: SelectChangeEvent<string>) => {
      setPostData((prev) => ({ ...prev, category: event.target.value }));
    },
    [postData]
  );

  const handleChangePost = useCallback(
    (event: any, key: string) => {
      setPostData((prev) => ({ ...prev, [key]: event.target.value }));
    },
    [postData]
  );

  const handlePost = useCallback(async () => {
    let localErrors = {};

    if (!postData.title) {
      localErrors = { ...erros, title: 'empty_filed' };
    }

    if (postData.title.length < 5) {
      localErrors = { ...erros, title: 'short_title' };
    }

    if (Object.keys(localErrors).length) {
      setErrors(localErrors);
      return;
    }

    if (!blocks) {
      toastError('no_post', 'error');
      return;
    }

    if (blocks.blocks.length < 2) {
      toastError('short_post', 'error');
      return;
    }
    setErrors({});

    try {
      const post = { ...postData, id: data?.id, body: blocks };

      const id = data
        ? await ApiService.post.update(post as PostUpdateDto)
        : await ApiService.post.post(post as PostDto);

      router.push(`/${postData.category}/${id}`);
    } catch (error) {
      if (error instanceof Error) {
        toastError(error.message, 'error');
      }
    }
  }, [erros, postData, router, blocks]);

  const CategorySelect = () => (
    <Select
      label='Category'
      size='small'
      sx={{ minWidth: 170 }}
      color='primary'
      value={postData.category}
      onChange={handleSelectCategory}
    >
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
          <TextField
            fullWidth
            label={t(`layout.ui.postTitle`)}
            error={!!erros?.title}
            helperText={erros?.title}
            value={postData.title}
            onChange={(e) => handleChangePost(e, 'title')}
          />
        </Box>
        <Box px={2}>
          <TextField
            fullWidth
            label={t(`layout.ui.mainImageURL`)}
            error={!!erros?.image}
            helperText={erros?.image}
            value={postData.image}
            onChange={(e) => handleChangePost(e, 'image')}
          />
        </Box>
        <Box
          sx={{ backgroundColor: '#edf2f7', color: 'black', overflowY: 'scroll' }}
          height='calc(100vh - 400px)'
        >
          <Box>
            <Editor data={blocks} onChange={setBlocks} holder='editorjs-container' />
          </Box>
        </Box>
        <Box px={2}>
          <TextField
            fullWidth
            label={t(`layout.ui.tags`)}
            size='small'
            value={postData.tags}
            onChange={(e) => handleChangePost(e, 'tags')}
            sx={{ display: { xs: 'flex', lg: 'none' } }}
          />
        </Box>
        <Box display='flex' justifyContent='space-between' px={2}>
          <Box display='flex' gap={1}>
            <TextField
              fullWidth
              label={t(`layout.ui.tags`)}
              size='small'
              value={postData.tags}
              onChange={(e) => handleChangePost(e, 'tags')}
              sx={{ display: { xs: 'none', lg: 'flex' } }}
            />
            <CategorySelect />
          </Box>
          <Button variant='contained' onClick={handlePost}>
            {t(`layout.ui.save`)}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
