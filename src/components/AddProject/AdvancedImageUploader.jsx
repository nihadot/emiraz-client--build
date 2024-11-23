import { AnimatePresence,motion } from "framer-motion";
import { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";
const AdvancedImageUploader = ({clearForm, onChange, preferredFormat = "jpeg",name }) => {
    const [images, setImages] = useState([]);
    const [loadingIndexes, setLoadingIndexes] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
  
    const maxFileSize = 500 * 1024; // 500 KB
    const supportedFormats = ["image/jpeg", "image/jpg", "image/svg+xml", "image/webp"];
  
    const handleFiles = async (files) => {
      const fileArray = Array.from(files);
      const newLoadingIndexes = [];
      const newImages = [];
  
      for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i];
  
        if (!supportedFormats.includes(file.type)) {
          setErrorMessage("Unsupported file format! Only JPEG, JPG, SVG, and WebP allowed.");
          continue;
        }
  
        setErrorMessage(""); // Clear previous error messages
        newLoadingIndexes.push(images.length + newLoadingIndexes.length); // Add index for loading animation
  
        try {
          const options = {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          };
  
          // Compress image if it exceeds size
          const compressedFile =
            file.size > maxFileSize
              ? await imageCompression(file, options)
              : file;
  
          // Convert to preferred format
          const convertedFile = await imageCompression.getFilefromDataUrl(
            await imageCompression.getDataUrlFromFile(compressedFile),
            preferredFormat
          );
  
          newImages.push({
            file: convertedFile,
            url: URL.createObjectURL(convertedFile),
          });
        } catch (error) {
          setErrorMessage("An error occurred while processing the images.");
        }
      }
  
      // Update state
      setLoadingIndexes([]);
      setImages((prevImages) => [...prevImages, ...newImages]);
      onChange(name,newImages.map((item) => item.file));
    };
  
    const handleFileInputChange = async (event) => {
      const files = event.target.files;
      await handleFiles(files);
    };
  
    const handleDrop = async (event) => {
      event.preventDefault();
      const files = event.dataTransfer.files;
      await handleFiles(files);
    };
  
    const handleDeleteImage = (index) => {
      const updatedImages = [...images];
      updatedImages.splice(index, 1);
      setImages(updatedImages);
      onChange(name,updatedImages.map((item) => item.file));
    };

    useEffect(()=>{
      setImages([]);
      // console.log('clearForm')
      // onChange(,null);
    },[clearForm]);
  
    return (
      <div
        className="flex flex-col gap-4 mt-8"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
              <label className="sf-medium font-medium text-sm text-[#000000]">
        Multiple Image 
      </label>
        {/* Drag-and-Drop Area */}
        <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center">
          <p className="text-sm text-gray-500">
            Drag & drop images here or{" "}
            <label className="text-blue-500 underline cursor-pointer">
              browse
              <input
                type="file"
                accept="image/jpeg, image/jpg, image/svg+xml, image/webp"
                multiple
                onChange={handleFileInputChange}
                className="hidden"
              />
            </label>
          </p>
        </div>
  
        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-500 text-sm">{errorMessage}</p>
        )}
  
        {/* Image Previews */}
        <div className="flex flex-wrap gap-4">
          {images?.map((image, index) => (
            <AnimatePresence key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative"
              >
                <img
                  src={image.url}
                  alt={`Preview ${index}`}
                  className="w-24 h-24 object-cover rounded-lg shadow-lg"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ✕
                </button>
              </motion.div>
            </AnimatePresence>
          ))}
  
          {/* Skeleton Previews */}
          {loadingIndexes.map((index) => (
            <motion.div
              key={index}
              className="w-24 h-24 bg-gray-200 rounded-lg animate-pulse"
            />
          ))}
        </div>
  
        {/* Instructions */}
        <p className="text-xs text-gray-500">
          Supported formats: JPEG, JPG, SVG, WebP. Max size: 500KB.
        </p>
      </div>
    );
  };

  export default AdvancedImageUploader;
  