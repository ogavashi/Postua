import { parseErrors } from '@/features/errors';

export const handleAxiosError = (error: any) => {
  if (error?.code === 'ECONNREFUSED') {
    throw new Error('check_connection');
  }

  if (error?.code === 'ERR_NETWORK') {
    throw new Error('server_problem');
  }

  const errorData = error.response?.data;
  const parsedErrors = parseErrors(errorData) || 'An error has occurred.';

  if (parsedErrors?.message) {
    throw new Error(parsedErrors.message as string);
  }

  throw parsedErrors;
};
