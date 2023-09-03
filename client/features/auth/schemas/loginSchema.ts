import * as yup from 'yup';

import { errorTexts, getErrorText } from '@/features/errors';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email(getErrorText(errorTexts.email))
    .required(getErrorText(errorTexts.required)),
  password: yup.string().required(getErrorText(errorTexts.required)),
});
