import { Dialog, Transition } from '@headlessui/react'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Fragment, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import * as Yup from "yup";
import { errorToast, successToast } from '../toast';
import Countries from './Countries';
import axios from 'axios';
import { SERVER_URL } from '../api';
import { ADMIN_TOKEN } from '../api/localstorage-varibles';
import Reason from './Reason';

export default function AddKYC({enqId,setRefresh,item}) {
  let [isOpen, setIsOpen] = useState(false)

  const validationSchema = Yup.object().shape({
    nationality: Yup.object()
      .required("Nationality is required"),
      passportNumber: Yup.string()
      .required("Passport number is required"),
      email: Yup.string()
      .email("Invalid email address") // Custom message for invalid email format
      .required("Email is required"), // Custom message for empty email    
      totalAmount: Yup.number()
      .required("Amount is required")
      .min(1, "Amount must be at least 1") // Minimum value validation
      .max(999999999, "Amount must not exceed 999,999,999") // Maximum value validation
      .test(
        "is-decimal",
        "Amount must be a valid number with up to 2 decimal places", // Custom error message
        (value) => (value === undefined || value === null) || /^\d+(\.\d{1,2})?$/.test(value.toString()) // Allow null/undefined or match decimal regex
      ),
  });
  const [isLoading, setIsLoading] = useState(false);






  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }


  const handleSubmit = async (values, { resetForm }) => {
    try {


      const data = {
        // nationality: values.nationality,
        email: values.email,
        passportNumber: values.passportNumber,
        totalAmount: values.totalAmount,
        reason: values.reason,
      };

      if(values.nationality){
        data.nationality = values.nationality._id
      }

      setIsLoading(true);

    //   await addingDeveloper(data);
    const response = await axios.put(
        `${SERVER_URL}/admin/closed/update/${enqId}`,data
 ,       {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}`,
          },
        }
      );
      // Simulate a success toast
    //   successToast("User successfully added");
    //   values.priority && setPriorityCount(prev => [...prev, values.priority])
      closeModal();
      resetForm();
      setIsLoading(false);
      setRefresh(prev => !prev );
    } catch (error) {
      const errorMsg = error.response?.data?.message || error?.message || "An error occurred during the operation.";
      errorToast(errorMsg);
      setIsLoading(false);
    }
  };


  return (
    <>
      <div className="mt-1 inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
         Update KYC
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add KYC
                  </Dialog.Title>
                  <div className="mt-2">
                   
                   {/*  */}
                   <Formik
      initialValues={{
        nationality: item.nationality ||  "",
        passportNumber: item?.passportNumber || "",
        name:  item?.name || "",
        email: item?.email || "",
        reason: item?.reason || "",
        totalAmount: item?.totalAmount || "",
        
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ setFieldValue, values,errors }) => (
        <Form className="">
          <div className="flex flex-wrap">

            <div className="flex-1 mt-3">
              {/* Nationality  */}
              <label htmlFor="nationality" className="font-medium text-sm">
              Nationality <span className="text-lg text-red-600">*</span>
                </label>
             <Countries id={item.nationality} selectValue={setFieldValue}  />
             <ErrorMessage name="nationality" component="div" className="text-red-500 text-sm" />

              {/* Passport Number */}
              <div className="flex relative mt-3 flex-col gap-2">
                <label htmlFor="passportNumber" className="font-medium text-sm">
                  Passport Number <span className="text-lg text-red-600">*</span>
                </label>
                <Field
                  name="passportNumber"
                  type="text"
                  placeholder="Enter Passport Number"
                  className="border py-4 px-5 rounded-[10px]  text-sm"
                />
                <ErrorMessage name="passportNumber" component="div" className="text-red-500 text-sm" />
               
              </div>

              {/* Email */}
              <div className="flex mt-3 flex-col gap-2">
                <label htmlFor="email" className="font-medium text-sm">
                  Email <span className="text-lg text-red-600">*</span>
                </label>
                <Field
                  name="email"
                  type="text"
                  placeholder="Enter Email"
                  className="border py-4 px-5 rounded-[10px]  text-sm"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>



                <Reason value={values.reason} setFieldValue={setFieldValue} />


                 {/* total Amount */}
                 <div className="flex mt-3 flex-col gap-2">
                <label htmlFor="totalAmount" className="font-medium text-sm">
                  Total Amount <span className="text-lg text-red-600">*</span>
                </label>
                <Field
                  name="totalAmount"
                  type="text"
                  placeholder="Enter Total Amount"
                  className="border py-4 px-5 rounded-[10px]  text-sm"
                />
                <ErrorMessage name="totalAmount" component="div" className="text-red-500 text-sm" />
              </div>


              
            {/* </div> */}
            <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    //   onClick={closeModal}
                    >
                      Update
                    </button>
                  </div>
            </div>

     
          </div>

        </Form>
      )}
    </Formik>
                   {/*  */}
                  </div>

                 
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
