import * as Yup from 'yup';

export const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .max(250, 'Name must be less than 250 characters')
      .required('Name is required'),
      emirateName: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .max(250, 'Name must be less than 250 characters')
      .required('Emirate Name is required'),
  });