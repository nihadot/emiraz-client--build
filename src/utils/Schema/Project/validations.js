import * as Yup from 'yup';
import dayjs from 'dayjs';

export const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Project title must be at least 3 characters')
      .max(250, 'Project title must be less than 250 characters')
      .required('Project title is required'),
      priceInAED: Yup.string()
      .min(1, 'Price must be at least 1')
      .max(250000000, 'Price cannot exceed 25 Cr')
      .required('Project price in AED is required'),
      priceInUSD: Yup.string()
      .min(0, 'Price must be at least 0')
      .max(50000000, 'Price cannot exceed 5 Cr')
      .required('Project price in USD is required'),
      priceInINR: Yup.string()
      .min(0, 'Price must be at least 0')
      .max(50000000, 'Price cannot exceed 5 Cr')
      .required('Project price in INR is required'),
      handoverDate: Yup.date()
      .min(dayjs().format('YYYY-MM-DD'), 'Cannot select past dates')
      .notRequired(),
      bedrooms: Yup.string()
      .required('Bedrooms is required')
      .min(1, 'Bedrooms must have at least 1 character')
      .max(250, 'Bedrooms must be less than 250 characters'),
      projectTypes: Yup.array()
      .min(1, 'Select at least one property type')
      .required('Property Type is required'),
      projectCities: Yup.array()
      .min(1, 'Select at least one city')
      .required('City is required'),
    developer: Yup.string().required("Please select a Developer")
  });




  export const editValidationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Project title must be at least 3 characters')
      .max(250, 'Project title must be less than 250 characters')
      .required('Project title is required'),
      priceInAED: Yup.string()
      .min(1, 'Price must be at least 1')
      .max(250000000, 'Price cannot exceed 25 Cr')
      .required('Project price in AED is required'),
      priceInUSD: Yup.string()
      .min(0, 'Price must be at least 0')
      .max(50000000, 'Price cannot exceed 5 Cr')
      .required('Project price in USD is required'),
      priceInINR: Yup.string()
      .min(0, 'Price must be at least 0')
      .max(50000000, 'Price cannot exceed 5 Cr')
      .required('Project price in INR is required'),
      handoverDate: Yup.date()
      .min(dayjs().format('YYYY-MM-DD'), 'Cannot select past dates')
      .notRequired(),
      bedrooms: Yup.string()
      .required('Bedrooms is required')
      .min(1, 'Bedrooms must have at least 1 character')
      .max(250, 'Bedrooms must be less than 250 characters'),
      projectTypes: Yup.array()
      .min(1, 'Select at least one property type').notRequired(),
      projectCities: Yup.array()
      .min(1, 'Select at least one city')
      .notRequired('City is required'),
    developer: Yup.string().notRequired("Please select a Developer")
  });