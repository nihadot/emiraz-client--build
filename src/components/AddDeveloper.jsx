import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PlaceHolder from "../assets/placeholder/placeholder-image.png";
import { errorToast, successToast } from "../toast";
import UploadingImage from "./uploading/UploadingImage";
import { CiCircleRemove } from "react-icons/ci";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { addingDeveloper, fetchDevelopersPrioritesAPI } from "../api";
import { CLOUDINARY_NAME, CLOUDINARY_PERSISTENT } from "../api/localstorage-varibles";
import axios from "axios";
import Lazyloading from "./Lazyloading/Lazyloading";

function AddUser() {
  const [isLoading, setIsLoading] = useState(false);

  const [priority, setPriority] = useState(false);
  const [priorityCount, setPriorityCount] = useState([]);

  const priorityList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


  const validationSchema = Yup.object().shape({
    developerName: Yup.string()
      .required("Developer Name is required")
      .min(3, "Minimum 3 characters required")
      .max(50, "Maximum 50 characters allowed"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must not exceed 20 characters"),
    username: Yup.string()
      .required("Username is required")
      .min(3, "Minimum 3 characters required")
      .max(20, "Maximum 20 characters allowed"),
    priority: Yup.string().optional(),
    image: Yup.mixed().required("Profile image is required"),
  });

  useEffect(() => {
    fetchdata()
  }, [])

  const fetchdata = async () => {
    try {
      const fetchPriorityResponse = await fetchDevelopersPrioritesAPI();
      setPriorityCount(fetchPriorityResponse.result)
    } catch (error) {
      errorToast(error?.response?.data?.message || error?.message || "Error occurred");

    }
  }

  const handleSubmit = async (values, { resetForm }) => {
    try {

      const data = {
        developerName: values.developerName,
        password: values.password,
        username: values.username,
        priority: values.priority,

        imageFile: {},
      };


      setIsLoading(true);

      // Simulate an image upload process if required
      if (values.image) {
        const formData = new FormData();
        formData.append("file", values.image);
        formData.append("upload_preset", CLOUDINARY_PERSISTENT); // Replace with your actual preset
        formData.append("folder", "developers_images"); // Replace with your specific folder name
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`, formData);
        const imageFile = {
          public_id: response.data.public_id,
          secure_url: response.data.secure_url,
          url: response.data.url,
          bytes: response.data.bytes,
          width: response.data.width,
          height: response.data.height,
        }
        data.imageFile = imageFile;
      }

      await addingDeveloper(data);
      // Simulate a success toast
      successToast("User successfully added");
      values.priority && setPriorityCount(prev => [...prev, values.priority])

      resetForm();
      setIsLoading(false);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error?.message || "An error occurred during the operation.";
      errorToast(errorMsg);
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        developerName: "",
        password: "",
        username: "",
        priority: "",
        image: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form className="">
          <div className="flex flex-wrap">

            <div className="flex-1">
              {/* Developer Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="developerName" className="font-medium text-sm">
                  Developer Name <span className="text-lg text-red-600">*</span>
                </label>
                <Field
                  name="developerName"
                  type="text"
                  placeholder="Enter developer name"
                  className="border py-4 px-5 rounded-[10px]  text-sm"
                />
                <ErrorMessage name="developerName" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Password */}
              <div className="flex mt-3 flex-col gap-2">
                <label htmlFor="password" className="font-medium text-sm">
                  Password <span className="text-lg text-red-600">*</span>
                </label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  className="border py-4 px-5 rounded-[10px]  text-sm"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Username */}
              <div className="flex mt-3 flex-col gap-2">
                <label htmlFor="username" className="font-medium text-sm">
                  Username <span className="text-lg text-red-600">*</span>
                </label>
                <Field
                  name="username"
                  type="text"
                  placeholder="Enter username"
                  className="border py-4 px-5 rounded-[10px]  text-sm"
                />
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
              </div>



              {/* Priority */}
              <div className="flex mt-3 flex-col gap-2 relative mb-6">
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

                    <p onClick={() => {
                      setFieldValue("priority", undefined);
                      setPriority(false);
                    }} className="">
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
            </div>

            <div className="px-4 flex-1">
              {/* Image Upload */}
              <h1 className="mb-3 text-4xl font-medium">Media  <span className="text-lg text-red-600">*</span></h1>
              <h2 className="font-medium text-sm mb-3"></h2>
              <div className="flex gap-3 items-center">
                <div className="w-80 h-64 relative rounded-[10px] overflow-hidden">
                  <img
                    src={values.preview || PlaceHolder}
                    alt="placeholder"
                    className=" flex justify-center items-center relative  rounded-[20px] overflow-hidden lg:h-[252px] sm:w-[180px] h-[172px] object-contain  lg:w-[264px]"
                  />
                  {values.preview && (
                    <span
                      onClick={() => {
                        setFieldValue("image", "");
                        setFieldValue("preview", "");
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
                  }}
                />
              </div>
              <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />

              {/* Submit */}
              <div className="p-3 text-lg">
                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-52 h-11 bg-black text-white hover:bg-gray-600 flex justify-center items-center rounded"
                >
                  {isLoading ? "Loading..." : "Save"}
                </button>
              </div>
            </div>
          </div>


          {/* preview */}
          <div

            className="cursor-pointer relative overflow-hidden p-5 lg:h-[252px] sm:w-[180px] h-[172px]  lg:w-[264px] rounded-[15px] flex justify-center items-center border"
          >
            {values.priority && <span className="flex absolute top-2 right-2 rounded-full w-9 h-9 bg-black z-40 text-white justify-center items-center">{values.priority}</span>}

            <Lazyloading
              src={values.preview || PlaceHolder}
              alt={values?.developerName}
              className={"my-10  object-contain max-h-[120px]"}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AddUser;
