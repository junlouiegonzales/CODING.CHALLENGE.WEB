export enum MESSAGE {
  REQUIRED = 'This is a required field',
  INVALID_VALUE = 'Please fill in valid value',
  ERROR = 'Unable to process your request this time, please try again later',
}

export const REGEX = {
  CELLPHONE: /^\([1-9]\d{2}\)\s\d{3}-\d{4}$/,
};
