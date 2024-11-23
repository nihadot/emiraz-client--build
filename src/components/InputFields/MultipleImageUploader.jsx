import React, { useEffect, useRef, useState } from 'react'
import { FaTrash } from 'react-icons/fa';

function MultipleImageUploader({
    label = "Label",
    disabled = false,
    value = "",
    name = "",
    onChange = () => {},
    type = "text",
    id = name,
    placeholder = "",
    classNameInput = "",
    classNameLabel = "",
    required = false,
    min = "",  // For date input validation
    error = null,  // Track validation error state
    touched = false, // Track if the field has been touched
    inputClassName="",
    titleOne,
    titleTwo,
    titleOneClassName,
    titleTwoClassName,
    clearFormField
}) {
    const [selectedFiles, setSelectedFiles] = useState([]);


    const uploadImage = useRef();
  const handleUploadingImage = () => uploadImage.current.click();
  const handleFileSelect = (event) => {
    const filesArray = Array.from(event.target.files);
    const validFiles = [];
    const invalidFiles = [];
    
    // Calculate total size of new files
    let totalSize = filesArray.reduce((acc, file) => acc + file.size, 0);
  
    // If you are appending to existing files, include the size of already selected files
    if (selectedFiles.length > 0) {
      totalSize += selectedFiles.reduce((acc, file) => acc + file.size, 0);
    }
  
    // Check if total size exceeds the 10MB limit (10MB = 10 * 1024 * 1024 bytes)
    const maxTotalSize = 10 * 1024 * 1024;
    if (totalSize <= maxTotalSize) {
      validFiles.push(...filesArray); // All files are valid
    } else {
      // Collect invalid file names
      invalidFiles.push(...filesArray.map(file => file.name));
    }
  
    // Set the selected valid files in state
    setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);
  
    // Provide feedback for files that caused exceeding size limit
    if (invalidFiles.length > 0) {
      alert(`The total size exceeds the 10MB limit. The following files were not added: ${invalidFiles.join(', ')}`);
    }

         // Reset file input to allow uploading the same image again
         event.target.value = null;
  };

  useEffect(()=>{
    onChange(selectedFiles);
  },[selectedFiles]);


  useEffect(() => {
    if(clearFormField){
     onChange([]);
     setSelectedFiles([]);
    }
  }, [clearFormField]);

  const handleRemoveImage = (index)=>{
        const result = selectedFiles.filter((item, i) => i !== index);
        setSelectedFiles(result);
  }
  return (
    <div className=" flex items-center gap-3">
          <div className="flex gap-2  max-w-md flex-wrap">
            {
              selectedFiles.length > 0 &&
              selectedFiles.map((file,index) => {
                return (
                  <div className="relative" key={index}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt="placeholder"
                      className="w-20 h-20  rounded-[10px]  object-cover "
                    />
                    <div  onClick={()=>handleRemoveImage(index)} className=" absolute cursor-pointer top-2 left-2">
                    <FaTrash size={18} color='red' />
                    </div>
                  </div>
                );
              })}
          </div>
          <div
            onClick={handleUploadingImage}
            className="w-16 h-11 bg-[#000000] text-[#ffffff] hover:bg-[#666666] flex justify-center items-center rounded-[4px] cursor-pointer"
          >
            <span> + </span>
          </div>
          <input
            ref={uploadImage}
            type="file"
            multiple
            accept="image/jpg, image/jpeg, image/png"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
  )
}

export default MultipleImageUploader