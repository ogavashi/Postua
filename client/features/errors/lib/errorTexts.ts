export const errorTexts = {
  required: () => `Field is required`,
  maxLength: (length: number) => `Field value cannot be longer than ${length}`,
  minLength: (length: number) => `Field value cannot be shorter than ${length}`,
  email: () => `Not valid email format`,
  phone: () => `Not valid phone format`,
  url: () => `Not valid url format`,
  unique: () => `Field must be unique`,
  formatNumber: () => `Field must be number`,
  noMatch: () => `Passwords doesn't match`,
};
