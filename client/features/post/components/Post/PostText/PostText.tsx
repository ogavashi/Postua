import { OutputBlockData, OutputData } from '@editorjs/editorjs';
import { Box, Typography } from '@mui/material';

interface PostTextProps {
  body: OutputData['blocks'];
}

export const PostText: React.FC<PostTextProps> = ({ body }) => {
  const renderBlock = (block: OutputBlockData) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <Typography textAlign='justify' component='p'>
            {block.data.text}
          </Typography>
        );

      case 'image':
        return <Box py={2} width='100%' component='img' alt='Post image' src={block.data.url} />;

      default:
        break;
    }
  };

  return (
    <Box px={2} py={2}>
      {body.map((block) => (
        <Box key={block.id}>{renderBlock(block)}</Box>
      ))}
    </Box>
  );
};
