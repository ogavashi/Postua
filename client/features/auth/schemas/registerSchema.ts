import * as yup from 'yup';

import { errorTexts } from '@/features/errors';

export const registerSchema = yup.object().shape({
  email: yup.string().email(errorTexts.email()).required(errorTexts.required()),
  fullName: yup.string().min(2, errorTexts.minLength(2)).required(errorTexts.required()),
  password: yup
    .string()
    .min(8, errorTexts.minLength(8))
    .max(32, errorTexts.maxLength(32))
    .required(errorTexts.required()),
  confirmPassword: yup.string().oneOf([yup.ref('password')], errorTexts.noMatch()),
});
