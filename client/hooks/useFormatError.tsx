import { useTranslation } from 'react-i18next';

export const useFormatError = () => {
  const { t } = useTranslation('errors');

  const formatErrorMessage = (errorMessage: any) => {
    if (typeof errorMessage === 'object' && errorMessage.key) {
      return `${t(errorMessage.key)} ${errorMessage.value}`;
    }
    return t(errorMessage);
  };

  return formatErrorMessage;
};
