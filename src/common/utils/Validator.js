import livr from 'livr';
import { phoneAlias, customRules } from 'src/common/utils/customRules';

const errorMessages = {
  REQUIRED: fieldName => `${fieldName.capitalize()} field is required.`,
  NOT_POSITIVE_INTEGER: fieldName => `${fieldName.capitalize()} should be a positive integer.`,
  WRONG_PHONE_TYPE: fieldName => `${fieldName.capitalize()} should have format: 380000000000.`,
  TOO_HIGH: fieldName => `${fieldName.capitalize()} should be a lower than 122.`,
  TOO_LONG: fieldName => `${fieldName.capitalize()} should be not longer than 12 symbols.`,
}

const ValidationResult = (isValid = true, errorMessage = '') => ({ isValid, errorMessage });

const Validator = (function (defaultRules = {}) {
  const validator = new livr.Validator(defaultRules);

  validator.setRules = function (newRules) {
    this.livrRules = newRules;
    this.isPrepared = false;
    this.validators = {};
  };

  validator.registerAliasedRule(phoneAlias);
  validator.registerRules(customRules);

  function validate(data, rules) {
    if (!rules) throw new Error('Data and rules in validate method cannot be empty!');

    validator.setRules(rules);

    const isValid = validator.validate(data);
    let validationResult = [true, ValidationResult()];

    if (!isValid) {
      const error = validator.getErrors();
      const fieldName = Object.keys(error)[0];
      const errorType = error[fieldName];

      const errorMessage = errorMessages[errorType](fieldName);
      validationResult = [false, ValidationResult(false, errorMessage)];
    }


    return validationResult;
  }

  return { validate };
}());

export { ValidationResult };
export default Validator;
