import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
// import

import 'src/components/Form.less';

import { TextField, Button, Icon } from '@material-ui/core';
import Validator, { ValidationResult } from 'src/common/utils/Validator';
import { deepCopy } from 'src/common/utils/utils';

export default class Form extends React.Component {
  static propTypes = {
    onAddUser: PropTypes.func.isRequired,
    onHideForm: PropTypes.func.isRequired,
    isFormOpen: PropTypes.bool.isRequired,
  }

  fields = ['name', 'surname', 'age', 'phone'];

  rules = {
    name: ['required', 'string'],
    surname: ['required', 'string'],
    age: ['required', 'positive_integer', { number_between: [0, 122] }],
    phone: ['required', 'phone_number', { length_equal: 12 }],
  };

  state = {
    formData: this.getDefaultFormData(),
    validations: this.getDefaultValidation(),
  }

  getDefaultValidation() {
    const defaultValidations = {};

    this.fields.forEach((fieldName) => {
      defaultValidations[fieldName] = ValidationResult();
    });

    return defaultValidations;
  }

  getDefaultFormData() {
    const defaultFormData = {};

    this.fields.forEach((fieldName) => {
      defaultFormData[fieldName] = '';
    });

    return defaultFormData;
  }

  getFormValidity = () => {
    const { formData } = this.state;
    const validations = this.getDefaultValidation();
    let isFormValid = true;

    this.fields.forEach((fieldName, index) => {
      const [isValid, validationResult] = Validator.validate({ [fieldName]: formData[fieldName] }, { [fieldName]: this.rules[fieldName] });

      if (!isValid) {
        validations[fieldName] = validationResult;
        isFormValid = false;
      }
    });

    return [isFormValid, validations];
  }

  changeFormData = (event) => {
    const { name, value } = event.target;
    const { formData, validations } = this.state;
    const newFormData = deepCopy(formData);
    const newValidations = deepCopy(validations);

    // console.log(this.rules, name);

    const [isValid, validationResult] = Validator.validate({ [name]: value }, { [name]: this.rules[name] });

    newFormData[name] = value;
    newValidations[name] = validationResult;

    this.setState({
      formData: newFormData,
      validations: newValidations,
    });
  }


  submitForm = () => {
    const { onAddUser } = this.props;
    const { formData } = this.state;
    const [isValid, validations] = this.getFormValidity();

    if (!isValid) {
      this.setState({ validations });
      return;
    }

    onAddUser(formData);
    this.setState({
      formData: this.getDefaultFormData(),
      validations: this.getDefaultValidation(),
    });
  }

  render() {
    const { formData, validations } = this.state;
    const { onHideForm, isFormOpen } = this.props;
    const formClasses = isFormOpen ? 'Form' : 'Form hidden';

    return (
      <div className={formClasses}>
        {this.fields.map((fieldName, index) => (
          <TextField key={`form${index}`}
                     type='text'
                     className='form__textField'
                     name={fieldName}
                     label={fieldName.capitalize()}
                     value={formData[fieldName]}
                     error={!validations[fieldName].isValid}
                     onChange={this.changeFormData}
                     helperText={validations[fieldName].errorMessage} />
        ))}
        <div className='form__buttons'>
          <Button variant='contained'
                  color='secondary'
                  className='form__button'
                  onClick={onHideForm}>
            Hide
          </Button>
          <Button variant='contained'
                  color='primary'
                  className='form__button'
                  onClick={this.submitForm}>
            Add
          </Button>
        </div>
      </div>
    );
  }
}
