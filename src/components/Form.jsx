import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import 'src/components/Form.less';

import { TextField, Button, Icon } from '@material-ui/core';
import Validator, { ValidationResult } from 'src/utils/Validator';
import { deepCopy } from 'src/components/utils';

export default class Form extends React.Component {
  static propTypes = {
    onAddUser: PropTypes.func.isRequired,
  }

  fields = ['name', 'surname', 'age', 'phone'];

  rules = {
    name: ['required', 'string'],
    surname: ['required', 'string'],
    age: ['required', 'positive_integer', { number_between: [0, 122] }],
    phone: 'phone_number',
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

    return (
      <div className='Form'>
        {this.fields.map((fieldName, index) => (
          <TextField type='text'
                     className='textField'
                     name={fieldName}
                     label={fieldName.capitalize()}
                     value={formData[fieldName]}
                     error={!validations[fieldName].isValid}
                     onChange={this.changeFormData}
                     helperText={validations[fieldName].errorMessage} />
        ))}
        <Button variant='contained'
                color='primary'
                style={{ margin: '1px' }}
                onClick={this.submitForm}>
          Send
        </Button>
      </div>
    );
  }
}
