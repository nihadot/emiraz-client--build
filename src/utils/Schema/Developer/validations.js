import * as Yup from 'yup';

export const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .max(250, 'Name must be less than 250 characters')
      .required('Name is required'),

    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .max(100, 'Password must be less than 100 characters')
      .required('Password is required'),

    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .max(100, 'Username must be less than 100 characters')
      .matches(/^[a-zA-Z0-9_]*$/, 'Only letters, numbers, and underscores are allowed')
      .required('Username is required'),
});





export const editDeveloperValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(250, 'Name must be less than 250 characters')
    .required('Name is required'),

  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(100, 'Username must be less than 100 characters')
    .matches(/^[a-zA-Z0-9_]*$/, 'Only letters, numbers, and underscores are allowed')
    .required('Username is required'),
});
