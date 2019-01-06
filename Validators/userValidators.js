import { isLength, isEmpty as _isEmpty, isEmail, equals } from 'validator';
import isEmpty from './isEmpty';

export default function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (_isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (_isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (_isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (_isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required';
  }

  if (!equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};