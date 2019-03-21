const phoneAlias = {
  name: 'phone',
  rules: ['required', { length_equal: 10 }],
  error: 'WRONG_PHONE_TYPE',
};

const phone_number = () => (value) => {
  if (value === undefined || value === null || value === '') return;

  const re = /^\d{12}/g;
  const validationResult = value.match(re);
  let isValid = validationResult && validationResult.length === 1;

  if (!isValid) {
    return 'WRONG_PHONE_TYPE';
  }
}

const customRules = {
  phone_number,
}

export { phoneAlias, customRules };
