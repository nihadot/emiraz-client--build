import { ErrorMessage } from "formik";

function ValidationErrorMessage({ name }) {
    return (
      <>
        <ErrorMessage
          name={name}
          component='div'
          className='text-red-500 font-medium text-xs ps-3 pt-1'
        />
      </>
    );
  }
  
export default ValidationErrorMessage 