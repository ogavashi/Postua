export const errorTexts = {
  required: () => `isDefined`,
  maxLength: () => `maxLength`,
  minLength: () => `minLength`,
  email: () => `isEmail`,
  phone: () => `isPhone`,
  url: () => `isUrl`,
  unique: () => `isUnique`,
  formatNumber: () => `isNumber`,
  noMatch: () => `noMatch`,
};

export const getErrorText = (error: () => string): string => `validation.${error()}`;
