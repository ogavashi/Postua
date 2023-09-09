import { FieldErrors, useFormContext } from 'react-hook-form';

import { useTranslation } from 'next-i18next';

import {
  FilledInputProps,
  InputProps,
  OutlinedInputProps,
  SxProps,
  TextField,
  Theme,
} from '@mui/material';

interface FormFieldProps {
  translatedErrors: { [k: string]: string };
  fieldKey: string;
  errors: FieldErrors;
  type?: string;
  inputProps?: Partial<FilledInputProps> | Partial<OutlinedInputProps> | Partial<InputProps>;
  sx?: SxProps<Theme>;
}

export const FormField: React.FC<FormFieldProps> = ({
  translatedErrors,
  fieldKey,
  errors,
  type,
  inputProps,
  sx = [],
}) => {
  const { register } = useFormContext();
  const { t } = useTranslation();

  return (
    <TextField
      id={fieldKey}
      label={t(`layout.ui.${fieldKey}`)}
      variant='outlined'
      type={type}
      size='small'
      helperText={translatedErrors?.[fieldKey] || ' '}
      error={!!errors?.[fieldKey]}
      InputProps={inputProps}
      {...register(fieldKey)}
      sx={sx}
    />
  );
};
