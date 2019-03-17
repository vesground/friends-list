export const phone = { // eslint-disable-line
  name: 'phone_number',
  rules: ['required', { length_equal: 10 }],
  error: 'WRONG_PHONE_TYPE',
};
