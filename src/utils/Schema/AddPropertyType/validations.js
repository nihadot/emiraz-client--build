import * as Yup from 'yup';

export const validationSchema = Yup.object({
    name: Yup.string()
      .min(5, 'Name must be at least 3 characters')
      .max(250, 'Name must be less than 250 characters')
      .required('Name is required'),
  });