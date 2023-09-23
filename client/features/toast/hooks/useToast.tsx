import { useTranslation } from 'next-i18next';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';

export const useToast = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const toastError = useCallback(
    (message: string, variant: 'error' | 'warning') =>
      enqueueSnackbar(t(`general.${message}`), { variant }),
    [enqueueSnackbar]
  );

  const toast = useCallback(
    (message: string, variant: 'error' | 'warning' | 'success') =>
      enqueueSnackbar(t(`toast.${message}`), { variant }),
    [enqueueSnackbar]
  );

  return { toast, toastError };
};
