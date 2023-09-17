import { useTranslation } from 'next-i18next';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';

export const useToastError = () => {
  const { t } = useTranslation('errors');
  const { enqueueSnackbar } = useSnackbar();

  const toast = useCallback(
    (message: string, variant: 'error' | 'warning' | 'success') =>
      enqueueSnackbar(t(`general.${message}`), { variant }),
    [enqueueSnackbar]
  );

  return toast;
};
