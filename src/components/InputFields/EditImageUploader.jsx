import React, { useEffect, useState } from 'react'
import UploadingImage from '../uploading/UploadingImage';
import { errorToast } from '../../toast';
import PlaceHolder from "../../assets/placeholder/placeholder-image.png";
import { CiCircleRemove } from 'react-icons/ci';
import { FaTrash } from 'react-icons/fa';
import { CITY_IMAG_URL } from '../../api';


function EditImageUploader({
  label = "Label",
  disabled = false,
  value = "",
  name = "",
  onChange = () => { },
  type = "text",
  id = name,
  placeholder = "",
  classNameInput = "",
  classNameLabel = "",
  required = false,
  min = "",  // For date input validation
  error = null,  // Track validation error state
  touched = false, // Track if the field has been touched
  inputClassName = "",
  titleOne,
  titleTwo,
  titleOneClassName,
  titleTwoClassName,
  previewClassName
}) {

  const [preview, setPreview] = useState("");
  const [file, setFile] = useState("");
  const handleRemoveImage = () => {
    setPreview("");
    setFile("");
    onChange("");
  }

  useEffect(() => {
    if(value && preview ){
      onChange({ file: pre, preview: preview })
    }
  }, [file, preview]);


  useEffect(() => {
    if(value){
      setPreview(`${CITY_IMAG_URL}/${value}`);
    }
  }, [value]);

  useEffect(() => {
    if(disabled){
      setPreview("");
      setFile("");
      onChange({ file: "", preview: "" })
    }
  }, [disabled]);
  return (

    <div className="">
      {titleOne && <h3 className={` text-4xl font-medium sf-medium ${titleOneClassName}`}>{titleOne}</h3> }
      {titleTwo && <h4 className={`sf-medium  font-medium text-sm mb-3 ${titleTwoClassName}`}>{titleTwo} {required ? <span className="text-red-500 text-lg">*</span> :  <span className='text-black/45 text-xs'>(option)</span> }</h4>}
      <div className="flex md:flex-row flex-col gap-3 items-center">
        <div className={`${previewClassName ? previewClassName : 'max-w-80 w-full h-64'} relative  rounded-[20px] overflow-hidden`}>
          <img
            src={ preview ? preview : value ? `${CITY_IMAG_URL}/${value}` :  PlaceHolder}
            alt="placeholder"
            className="w-full h-full object-cover "
          />
          {preview && (
            <span
              onClick={handleRemoveImage}
              className=" absolute top-4 left-4  cursor-pointer"
            >
              {" "}
              <FaTrash className="text-red-600 " size={24} />{" "}
            </span>
          )}
        </div>

        <div className="">
          <UploadingImage
            isLoading={disabled}
            onError={(error) => {
              errorToast(error);
            }}
            previewUrl={(e) => setPreview(e)}
            selectedFile={(file) => setFile(file)}
          />
        </div>
      </div>
    </div>
  )
}

export default EditImageUploader