import livr from 'livr';

String.prototype.capitalize = function () {
  return this.replace(/(?:^|\s)\S/g, firstCharacter => firstCharacter.toUpperCase());
};

export const deepCopy = obj => JSON.parse(JSON.stringify(obj));

export const ValidationResult = (isValid = true, errorMessage = '') => ({ isValid, errorMessage });

const Validator = (function (defaultRules = {}) {
  const validator = new livr.Validator(defaultRules);

  validator.registerAliasedRule({
    name: 'phone_number',
    rules: ['required', { min_length: 6 }],
    error: 'WRONG_PHONE_TYPE',
  });

  function validate(data, rules) {
    if (!rules) throw new Error('Data and rules in validate method cannot be empty!');

    const isValid = validator.validate(data, rules);
    let validationResult = [true, ValidationResult()];

    if (!isValid) {
      const errors = validator.getErrors();
      validationResult = [false, ValidationResult(false, JSON.stringify(errors))];
    }

    return validationResult;
  }

  return {
    validate,
  };
}());

export default Validator;
