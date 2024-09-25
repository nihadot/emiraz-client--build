import { useRef, useState } from 'react';
import { errorToast, successToast } from '../toast';
import { addingPropertyTypeAPI } from '../api';
import PlaceHolder from "../assets/placeholder/placeholder-image.png";
import UploadingImage from './uploading/UploadingImage';
import { CiCircleRemove } from 'react-icons/ci';


function AddPropertyType() {

    const [isLoading,setIsLoading] = useState()
    const [image, setImage] = useState("");
    // -----------------------------------------------------
    const [formData,setFormData] = useState({name:'',description:'',preview:''})
    // -----------------------------------------------------

    const removeImage = () => {
        setFormData({ ...formData, preview: "" });
        setImage("");
      };

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    // -------------------------------------------------

    const handleSubmit = async(e)=>{
        
        try {
            setIsLoading(true)
            e.preventDefault()
            const formDataFields = new FormData();
            formDataFields.append("name", formData.name);
            formDataFields.append("description", formData.description);
      
            if (image) {
              formDataFields.append("mainImgaeLink", image);
            }
      
            await addingPropertyTypeAPI(formDataFields);
            successToast('Successfully added')
            setFormData({description:'',name:'',mainImgaeLink:""})
            setIsLoading(false)
        }  catch (error) {
              errorToast(error.response.data.message || error.message || 'An error occurred ')
              setIsLoading(false)
          }
    }
   

  return (
    <form onSubmit={handleSubmit} className='flex flex-wrap'>
        <div className='flex-1'>

            {/* Property Type Name */}
            <div className="flex flex-col gap-2 mx-3">
                <label   htmlFor="name" className="sf-medium font-medium text-sm text-[#000000] capitalize">Property Type Name</label>
                <input disabled={isLoading} autoComplete="name" value={formData.name} name="name" onChange={handleChange} type="text" id="name" placeholder="Villa" title='Property Type Name' className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] font-extralight sf-normal text-sm text-[#666666]  outline-none" />
            </div>

            {/* Property Type Description */}
            {/* <div className="flex flex-col gap-2 mx-3 m-3">
                <label   htmlFor="description" className="sf-medium font-medium text-sm text-[#000000]">Property Type Description</label>
                <input disabled={isLoading} autoComplete="" name="description" value={formData.description} onChange={handleChange} type="text" id="description" placeholder="New Projects Available" className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none" />
            </div> */}
        </div>

        <div className="px-4 flex-1">

            {/*  Main image */}
            <h1 className='mb-3 text-4xl font-medium sf-medium'>Media</h1>
            <h2 className='sf-medium font-medium text-sm mb-3'>Main Image</h2>
            <div className="flex gap-3 items-center">
          <div className="w-80 h-64 relative  rounded-[20px] overflow-hidden">
            <img
              src={formData.preview || PlaceHolder}
              alt="placeholder"
              className="w-full h-full object-cover "
            />
            {formData.preview && (
              <span
                onClick={removeImage}
                className=" absolute top-2 left-3  cursor-pointer"
              >
                {" "}
                <CiCircleRemove className="text-red-600 " size={24} />{" "}
              </span>
            )}
          </div>

          <div className="">
            <UploadingImage
              isLoading={isLoading}
              onError={(error) => {
                errorToast(error);
              }}
              previewUrl={(e) => {
                setFormData({ ...formData, preview: e });
              }}
              selectedFile={(file) => setImage(file)}
            />
          </div>
        </div>
            {/* submit */}

            <div className="p-3 poppins-semibold text-lg">
              <button disabled={isLoading} type='submit' className="w-52 h-11 bg-[#000000] text-[#ffffff] hover:bg-[#666666] flex justify-center items-center rounded-[4px] cursor-pointer">
                { isLoading ? 'loading...' : 'Save'}
              </button>
            </div>

        </div>

    </form>

  )
}

export default AddPropertyType