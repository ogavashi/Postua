import * as yup from 'yup';

import { errorTexts } from '@/features/errors';

export const loginSchema = yup.object().shape({
  email: yup.string().email(errorTexts.email()).required(errorTexts.required()),
  password: yup.string().required(errorTexts.required()),
});
