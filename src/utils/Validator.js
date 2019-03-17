import livr from 'livr';

const ValidationResult = (isValid = true, errorMessage = '') => ({ isValid, errorMessage });

const Validator = (function (defaultRules = {}) {
  const validator = new livr.Validator(defaultRules);

  validator.setRules = function (newRules) {
    this.livrRules = newRules;
    this.isPrepared = false;
    this.validators = {};
  };

  validator.registerAliasedRule({
    name: 'phone_number',
    rules: ['required', { length_equal: 10 }],
    error: 'WRONG_PHONE_TYPE',
  });

  function validate(data, rules) {
    if (!rules) throw new Error('Data and rules in validate method cannot be empty!');

    validator.setRules(rules);

    const isValid = validator.validate(data);
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

export { ValidationResult };
export default Validator;
