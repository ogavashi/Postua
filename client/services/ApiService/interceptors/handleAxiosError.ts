import { parseErrors } from '@/features/errors';

export const handleAxiosError = (error: any) => {
  console.log(error);

  const errorData = error.response?.data;
  const parsedErrors = parseErrors(errorData) || 'An error has occurred.';

  if (parsedErrors?.message) {
    throw new Error(parsedErrors.message as string);
  }

  throw parsedErrors;
};
