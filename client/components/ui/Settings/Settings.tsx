import { Box, Divider, IconButton, Typography } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import { ColorToggle, LanguageSelect } from '@/components';

import { Drawer } from './Drawer.styled';

interface SettingsProps {
  isOpen: boolean;
  handleSettingsToggle: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ isOpen, handleSettingsToggle }) => {
  return (
    <Drawer
      anchor='right'
      open={isOpen}
      onClose={handleSettingsToggle}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Box display='flex' flexDirection='column' gap={2} sx={{ p: 2 }}>
        <Box>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            width='100%'
            mb={1}
          >
            <Typography variant='h4'>Settings</Typography>
            <IconButton color='primary' size='small' onClick={handleSettingsToggle}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
        </Box>
        <Typography>Language</Typography>
        <LanguageSelect />
        <Typography>Mode</Typography>
        <ColorToggle />
      </Box>
    </Drawer>
  );
};
