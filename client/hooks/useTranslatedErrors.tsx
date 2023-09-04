import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import { FieldErrors } from 'react-hook-form';

export const useTranslatedErrors = (errors: FieldErrors) => {
  const { t } = useTranslation('errors');

  const formatErrorMessage = (errorMessage: any) => {
    if (typeof errorMessage === 'object' && errorMessage.key) {
      return `${t(errorMessage.key)} ${errorMessage.value}`;
    }
    return t(errorMessage);
  };

  const translatedErrors = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(errors).map(([key, value]) => [key, formatErrorMessage(value?.message)])
      ),
    [errors, formatErrorMessage]
  );

  return translatedErrors;
};
