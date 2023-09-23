import { useCallback, useState } from 'react';

import { Box } from './Box.styled';
import { styles } from './styles';

import {
  Backdrop,
  Box as MuiBox,
  Fade,
  Modal,
  Typography,
  Divider,
  IconButton,
} from '@mui/material';

import BookIcon from '@mui/icons-material/Book';
import CloseIcon from '@mui/icons-material/Close';

import { LoginTab, RegisterTab } from '@/features/auth';
import { useAppDispatch, useAppSelector } from '@/store';
import { appActions, appSelectors } from '@/features/app';

type ModalState = 'register' | 'login';

export const AuthModal = () => {
  const [modalState, setModalState] = useState<ModalState>('login');

  const toggleModalState = useCallback(() => {
    setModalState((prev) => (prev === 'register' ? 'login' : 'register'));
  }, []);

  const isOpen = useAppSelector(appSelectors.authModal);

  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    dispatch(appActions.setAuthModal(false));
  }, []);

  const Tab = () => {
    let tab;

    const commonProps = { handleClose, onToggle: toggleModalState };

    switch (modalState) {
      case 'login':
        tab = <LoginTab {...commonProps} />;
        break;

      default:
        tab = <RegisterTab {...commonProps} />;
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
          <IconButton css={styles.closeBtn} color='primary' size='small' onClick={handleClose}>
            <CloseIcon />
          </IconButton>
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
