import { useCallback, useState } from 'react';

import { Box } from './Box.styled';

import { Backdrop, Box as MuiBox, Fade, Modal, Typography, Divider } from '@mui/material';

import BookIcon from '@mui/icons-material/Book';
import { styles } from './styles';

import { LoginTab, RegisterTab } from '@/features/auth';

type ModalState = 'register' | 'login';

interface AuthModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, handleClose }) => {
  const [modalState, setModalState] = useState<ModalState>('login');

  const toggleModalState = useCallback(() => {
    setModalState((prev) => (prev === 'register' ? 'login' : 'register'));
  }, []);

  const Tab = () => {
    let tab;
    switch (modalState) {
      case 'login':
        tab = <LoginTab onToggle={toggleModalState} />;
        break;

      default:
        tab = <RegisterTab onToggle={toggleModalState} />;
        break;
    }

    return tab;
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpen}>
        <Box>
          <MuiBox display='flex' alignItems='center' mb='auto' width='100%'>
            <MuiBox display='flex' alignItems='center' width='100%' gap={1}>
              <BookIcon css={styles.icon} />
              <Typography id='transition-modal-title' variant='h4' css={styles.logo}>
                Postua
              </Typography>
            </MuiBox>
          </MuiBox>
          <Divider orientation='vertical' flexItem />
          <Divider flexItem />
          <Tab />
        </Box>
      </Fade>
    </Modal>
  );
};
