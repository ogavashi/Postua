import { Box } from '@mui/material';

import Blocks, { DataProp } from 'editorjs-blocks-react-renderer';

interface PostTextProps {
  body: DataProp;
}

export const PostText: React.FC<PostTextProps> = ({ body }) => {
  return (
    <Box px={2} py={2}>
      <Blocks
        data={body}
        config={{
          image: {
            className: 'image',
          },
          paragraph: {
            className: 'text',
          },
        }}
      />
    </Box>
  );
};
