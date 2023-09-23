import { appActions } from '@/features/app';
import { useAppDispatch } from '@/store';
import { useCallback } from 'react';

export const useShowAuthModal = () => {
  const dispatch = useAppDispatch();
  const showAuthModal = useCallback(() => dispatch(appActions.setAuthModal(true)), []);

  return showAuthModal;
};
