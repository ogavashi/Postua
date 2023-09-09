import * as yup from 'yup';

import { errorTexts, getErrorText } from '@/features/errors';

export const updateSchema = yup.object().shape({
  fullName: yup
    .string()
    .required(getErrorText(errorTexts.required))
    .min(2, ({ min }) => ({ key: getErrorText(errorTexts.minLength), value: min })),
  password: yup
    .string()
    .nullable()
    .matches(/.{8,}/, {
      excludeEmptyString: true,
      message: () => ({ key: getErrorText(errorTexts.minLength), value: 8 }),
    }),
  confirmPassword: yup.string().oneOf([yup.ref('password')], getErrorText(errorTexts.noMatch)),
});
