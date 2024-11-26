import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css"; // Import styles
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ADMIN_TOKEN, CLOUDINARY_NAME, CLOUDINARY_PERSISTENT } from "../../api/localstorage-varibles";
import { useEffect, useState } from "react";
import MainImageUploader from "../../components/AddProject/ImageUploader";
import { ErrorMessage, Form, Formik } from "formik";
import AdvancedImageUploader from "../../components/AddProject/AdvancedImageUploader";
import { errorToast, successToast } from "../../toast";
import { AnimatePresence,motion } from "framer-motion";
import { SERVER_URL } from "../../api";





const validationSchema = Yup.object().shape({
    //   imageFile: Yup.mixed()
    // .required("Image is required")
  

});


// Check if it's available
function AdminPropertyEditImagesPage() {
  const [isLoading, setIsLoading] = useState(false);
const navigate = useNavigate();
//   const [clearForms, setClearForms] = useState(false);
const { state } = useLocation();
const { userId } = useParams();

  const [userData, setUserData] = useState({
    imageFile:  "",
    imageFiles : "",
  });
  console.log(state,'state')

  useEffect(() => {
    if(state){
        setUserData({
            image:state.imageFile,
            images:state.imageFiles
        });
    }
  }, []);

//   const [isDraft, setIsDraft] = useState(false);  // State to track if the draft is active

  // Button Styles

  const uploadImage = async (image, folder) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", CLOUDINARY_PERSISTENT);
    formData.append("folder", folder);
  
    try {
      const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`, formData);
      return {
        asset_id: response.data.asset_id,
        secure_url: response.data.secure_url,
        url: response.data.url,
        public_id: response.data.public_id,
      };
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Image upload failed');
    }
  };
  

  const handleSubmit = async (event, { resetForm }) => {


console.log(event,'use data')

    try {

       setIsLoading(true);
const data = {};
const obj = Object.keys(event);
for (const element of obj) {
  event[element] && (data[element] = event[element])
}

// console.log('first')
// console.log(event,'eee')
      if (event.imageFile) {
        // console.log(event.imageFile,'image')
        const imageData = await uploadImage(event.imageFile, 'projects_upload');
        data.imageFile = imageData;
      }
// return true;
      
      if (event.imageFiles && event.imageFiles.length > 0) {
        const uploadedImages = [];
        for (const image of event.imageFiles) {
          const imageData = await uploadImage(image, 'projects_sub_upload');
          uploadedImages.push(imageData);
        }
        data.imageFiles = uploadedImages;
      }
      console.log(data,'33')
    //   
 

    // await addingPropertyAPI(data);
    // resetForm();
    // handleClear();
    // setIsDraft(false);  // Reset the draft state here after form reset
    // successToast('Successfully added');
       
    const response = await axios.put(`${SERVER_URL}/property/image/${userId}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
      });
  
        successToast('Successfully updated');
        navigate(`/admin/edit-properties`);
     


    } catch (error) {
      errorToast(error?.response?.data?.message || error?.message  || 'Error')
    } finally {
      setIsLoading(false);
    }
  }


  const handleDeleteImage =async (image) => {
   
    try {

    const status = window.confirm("Are you want to delete this?")
if(!status){
    return true;
}
        const response = await axios.delete(`${SERVER_URL}/property/delete-image/${userId}`, {
            data:{image},
            headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
          });

          setUserData(prev=>{
            const index = prev.images.indexOf(image);
            if (index > -1) {
              return {
               ...prev,
                images: [...prev.images.slice(0, index),...prev.images.slice(index + 1)],
              };
            }
            return prev;
          })
      } catch (error) {
        errorToast(error?.response?.data?.message || error?.message  || 'Error');
      }
  };

  return (
    <Formik
      initialValues={{
        imageFile:'',
        imagesFiles:'',
        // ...userData,
    }}
    
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values,errors }) => (
        <Form className="flex-wrap flex">
          <div className="max-w-[600px] w-full">
            <div className="flex-1">
                {/* {console.log(userData,'userdata')} */}
            <img
                src={userData?.image?.secure_url}
                alt="Preview"
                className="w-80 mt-10 h-64 object-cover rounded-lg shadow-lg"
              />

<div className="flex flex-wrap gap-4 mt-6">
          {userData?.images?.map((image, index) => (
            <AnimatePresence key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative"
              >
                <img
                  src={image?.secure_url}
                  alt={`Preview ${index}`}
                  className="w-24 h-24 object-cover rounded-lg shadow-lg"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(image)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ✕
                </button>
              </motion.div>
            </AnimatePresence>
          ))}
  
          {/* {loadingIndexes.map((index) => (
            <motion.div
              key={index}
              className="w-24 h-24 bg-gray-200 rounded-lg animate-pulse"
            />
          ))} */}
        </div> 



        {/* {console.log(values.imageFile,'values.imageFile')} */}
              <AdvancedImageUploader
                onChange={setFieldValue}
                name={'imageFiles'}
                preferredFormat="webp"
                // clearForm={clearForms}
                // clearTheImageMultipleStatus={clearTheImageMultipleStatus}
              />
              <MainImageUploader
  name="imageFile"
  onChange={(_, file) => setFieldValue(_, file)} // Updates Formik with the file object
  preferredFormat="webp"
//   clearForms={clearForms}
  value={values.imageFile} // Binds Formik value to the uploader
/>
<ErrorMessage
  name="imageFile"
  component="div"
  className="text-red-500 font-medium text-xs ps-3 pt-1"
/>
      

  


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
          </div>

            

       
        </Form>
      )}
    </Formik>
  );
}

export default AdminPropertyEditImagesPage;