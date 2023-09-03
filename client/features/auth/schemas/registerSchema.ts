import * as yup from 'yup';

import { errorTexts, getErrorText } from '@/features/errors';

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .required(getErrorText(errorTexts.required))
    .email(getErrorText(errorTexts.email)),
  fullName: yup
    .string()
    .required(getErrorText(errorTexts.required))
    .min(2, ({ min }) => ({ key: getErrorText(errorTexts.minLength), value: min })),
  password: yup
    .string()
    .required(getErrorText(errorTexts.required))
    .min(8, ({ min }) => ({ key: getErrorText(errorTexts.minLength), value: min }))
    .max(32, ({ max }) => ({ key: getErrorText(errorTexts.maxLength), value: max })),
  confirmPassword: yup.string().oneOf([yup.ref('password')], getErrorText(errorTexts.noMatch)),
});
