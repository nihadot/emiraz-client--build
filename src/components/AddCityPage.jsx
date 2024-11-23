import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PlaceHolder from "../assets/placeholder/placeholder-image.png";
import { errorToast, successToast } from "../toast";
import { addingCity, fetchCityPrioritesAPI } from "../api";
import {
  addCitiesSuccess,
  setError,
  setLoading,
} from "../features/citiesSlice";
import { useDispatch } from "react-redux";
import UploadingImage from "./uploading/UploadingImage";
import { CiCircleRemove } from "react-icons/ci";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { CLOUDINARY_NAME, CLOUDINARY_PERSISTENT } from "../api/localstorage-varibles";
import axios from "axios";
import Lazyloading from "./Lazyloading/Lazyloading";

function AddCity() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");
  const [priority, setPriority] = useState(false);
  const [priorityCount, setPriorityCount] = useState([]);

  const priorityList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const fetchdata = async () => {
    try {
      const fetchPriorityResponse = await fetchCityPrioritesAPI();
      setPriorityCount(fetchPriorityResponse.result);
    } catch (error) {
      errorToast(error?.response?.data?.message || error?.message || "Error occurred");
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const validationSchema = Yup.object().shape({
    cityName: Yup.string()
      .required("City Name is required")
      .min(3, "Minimum 3 characters required")
      .max(50, "Maximum 50 characters allowed"),
    emirateName: Yup.string()
      .required("Emirate Name is required")
      .min(3, "Minimum 3 characters required")
      .max(50, "Maximum 50 characters allowed"),
    priority: Yup.string().optional(),
    image: Yup.mixed().required("Main image is required"),
  });


  const handleSubmit = async (values, { resetForm }) => {

  
  const data = {
    cityName: values.cityName,
    emirateName: values.emirateName,
    priority: values.priority,
    imageFile: {},
  };
  // }
    try {
      setIsLoading(true);

      if (values.image) {
        const formData = new FormData();
        formData.append("file", values.image);
        formData.append("upload_preset", CLOUDINARY_PERSISTENT); // Replace with your actual preset
        formData.append("folder", "city_images"); // Replace with your specific folder name
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,formData);
        const imageFile = {
          public_id : response.data.public_id,
          secure_url : response.data.secure_url,
          url : response.data.url,
          bytes : response.data.bytes,
          width : response.data.width,
          height : response.data.height,
        }
        data.imageFile = imageFile;
       } 

   
      dispatch(setLoading());
      await addingCity(data);
      dispatch(addCitiesSuccess());
      successToast("City successfully added");

      values.priority && setPriorityCount(prev => [...prev, values.priority])
      
      resetForm();
      setImage("");
      setIsLoading(false);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error?.message || "An error occurred during the operation.";
      dispatch(setError(errorMsg));
      errorToast(errorMsg);
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        cityName: "",
        emirateName: "",
        priority: "",
        image: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values, resetForm }) => (
        <Form className="flex flex-wrap">
          <div className="flex-1">
            {/* City Name */}
            <div className="flex flex-col gap-2 ">
              <label htmlFor="cityName" className="sf-medium font-medium text-sm text-[#000000]">
                City Name    <span className="text-lg text-red-600">*</span>
              </label>
           

              <Field
                disabled={isLoading}
                name="cityName"
                type="text"
                placeholder="Down Town"
                className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] font-extralight sf-normal text-sm text-[#666666] outline-none"
              />
              <ErrorMessage name="cityName" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Emirate Name */}
            <div className="flex mt-3 flex-col gap-2 ">
              <label htmlFor="emirateName" className="sf-medium font-medium text-sm text-[#000000]">
                Emirate Name <span className="text-lg text-red-600">*</span>
              </label>
              <Field
                disabled={isLoading}
                name="emirateName"
                type="text"
                placeholder="Dubai"
                className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666] outline-none"
              />
              <ErrorMessage name="emirateName" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Priority */}
            <div className="flex mt-3 flex-col gap-2 relative">
              <label htmlFor="priority" className="sf-medium font-medium text-sm text-[#000000]">
                Priority <span className="text-xs text-slate-700/60">(options)</span>
              </label>
              <div
                onClick={() => setPriority(!priority)}
                className="flex cursor-pointer border w-full border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666] outline-none"
              >
                <span>{values.priority || "Select anyone"}</span>
                <span className="absolute right-5 top-12">
                  {priority ? <FaAngleUp /> : <FaAngleDown />}
                </span>
              </div>
              {priority && (
                <div className="z-50 absolute rounded-[10px] top-24 bg-white w-full border p-3">
                  
                  <p  onClick={() => {
                          setFieldValue("priority", undefined);
                          setPriority(false);
                        }}  className="">
                       Choose anyone
                      </p>
                  {priorityList.map((item, i) =>
                    priorityCount.includes(item) ? (
                      <p key={i} className="cursor-not-allowed py-1 text-red-400">
                        {item} Not available
                      </p>
                    ) : (
                      <p
                        key={i}
                        onClick={() => {
                          setFieldValue("priority", item);
                          setPriority(false);
                        }}
                        className="py-1 cursor-pointer"
                      >
                        {item}
                      </p>
                    )
                  )}
                </div>
              )}
            </div>

            <div
                      
                  className="cursor-pointer relative border rounded-[10px] max-w-[200px] w-full mt-5"
                      >
                        <div className="relative rounded-[10px] overflow-hidden  h-[200px]">
                          <Lazyloading
                            src={values.preview || PlaceHolder}
                            alt={values.cityName}
                            className="w-full h-full object-cover"
                          />
                          <div className="bg-gradient-to-b from-black to-black absolute top-0 w-full h-full opacity-20 z-20"></div>
                          <div className="px-3 py-3 absolute top-0 w-full h-full z-30">
                            <span className="block capitalize text-white w-fit bg-[#666666] text-[10px] rounded-[40px] px-3 py-2">
                              {values.emirateName}
                            </span>
                            <p className="poppins-semibold capitalize text-[24px] text-white ">
                              {values.cityName}
                            </p>
                          </div>
                       { values.priority &&  <span className="flex absolute top-2 right-2 rounded-full w-9 h-9 bg-black z-40 text-white justify-center items-center">{values.priority}</span>}

                        </div>
                        <p className="py-4 capitalize px-6 text-[15px] poppins-medium">
                          {values?.count === 0
                            ? "Not available"
                            : values?.count === 1
                            ? `${values?.count} Project available`
                            : `${values?.count} Projects available`}
                        </p>
                      </div>
          </div>

          <div className="px-4 flex-1">
            {/* Main image */}
            <h1 className="mb-3 text-4xl font-medium sf-medium">Media</h1>
            <h2 className="sf-medium font-medium text-sm mb-3">Main Image  <span className="text-lg text-red-600">*</span></h2> 
           
            <div className="flex gap-3 items-center">
              <div className="w-80 h-64 relative rounded-[20px] overflow-hidden">
                <img
                  src={values.preview || PlaceHolder}
                  alt="placeholder"
                  className="w-full h-full object-cover"
                />
                {values.preview && (
                  <span
                    onClick={() => {
                      setFieldValue("image", "");
                      setImage(undefined);
                      setFieldValue("preview", "")
                    }}
                    className="absolute top-2 left-3 cursor-pointer"
                  >
                    <CiCircleRemove className="text-red-600" size={24} />
                  </span>
                )}
              </div>

     
              <UploadingImage
                isLoading={isLoading}
                onError={(error) => errorToast(error)}
                previewUrl={(url) => setFieldValue("preview", url)}
                selectedFile={(file) => {
                  setFieldValue("image", file);
                  setImage(file);
                }}
              />


            </div>
<ErrorMessage name="image" component="div" className="text-red-500 text-sm" />

            {/* Submit */}
            <div className="p-3 poppins-semibold text-lg">
              <button
                disabled={isLoading}
                type="submit"
                className="w-52 h-11 bg-[#000000] text-[#ffffff] hover:bg-[#666666] flex justify-center items-center rounded-[4px] cursor-pointer"
              >
                {isLoading ? "Loading..." : "Save"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AddCity;
