import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";
import ValidationErrorMessage from "../Error/ValidationErrorMessage";
import { ErrorMessage } from "formik";

const MainImageUploader = ({
  name = "imageFile",
  required=  true,
  onChange,
  preferredFormat = "jpeg",
  value,
  clearForms
}) => {
  const [image, setImage] = useState(value || null); // Store only one image
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const maxFileSize = 500 * 1024; // 500 KB
  const supportedFormats = ["image/jpeg", "image/jpg", "image/svg+xml", "image/webp"];

  const handleFile = async (file) => {
    if (!supportedFormats.includes(file.type)) {
      setErrorMessage("Unsupported file format! Only JPEG, JPG, SVG, and WebP allowed.");
      return;
    }

    setErrorMessage(""); // Clear previous error messages
    setLoading(true);

    try {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      // Compress image if it exceeds size
      const compressedFile = file.size > maxFileSize ? await imageCompression(file, options) : file;

      // Convert to preferred format
      const convertedFile = await imageCompression.getFilefromDataUrl(
        await imageCompression.getDataUrlFromFile(compressedFile),
        preferredFormat
      );

      const imageUrl = convertedFile && URL.createObjectURL(convertedFile);
      setImage({ file: convertedFile, url: imageUrl });
      onChange(name, convertedFile); // Update Formik with the file object
    } catch (error) {
      setErrorMessage("An error occurred while processing the image.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0]; // Only handle one file
    if (file) {
      await handleFile(file);
      event.target.value = null; // Reset file input
    }
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0]; // Only handle one file
    if (file) {
      await handleFile(file);
    }
  };

  const handleDeleteImage = () => {
    setImage(null); // Remove the image
    onChange(name, null); // Clear value in Formik
  };

  useEffect(()=>{
    setImage(''); // Remove the image
    onChange(name, ''); // Clear value in Formik
  },[clearForms])


  return (
    <div
      className="flex flex-col gap-4 mt-8"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <label className="sf-medium font-medium text-sm text-[#000000]">
        Main Image { required && <span className="text-lg text-red-600">*</span>}
      </label>

      {/* Drag-and-Drop Area */}
      <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center">
        <p className="text-sm text-gray-500">
          Drag & drop an image here or{" "}
          <label className="text-blue-500 underline cursor-pointer">
            browse
            <input
              type="file"
              accept="image/jpeg, image/jpg, image/svg+xml, image/webp"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </label>
        </p>
      </div>

      {/* Error Message */}
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

      {/* Image Preview */}
      {image && (
        <div className="relative">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative w-fit"
            >
              <img
                src={image.url}
                alt="Preview"
                className="w-80 h-64 object-cover rounded-lg shadow-lg"
              />
              <button
                type="button"
                onClick={handleDeleteImage}
                className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Skeleton Loader */}
      {loading && (
        <div className="w-48 h-48 bg-gray-200 rounded-lg animate-pulse"></div>
      )}

      {/* Instructions */}
      <p className="text-xs text-gray-500">
        Supported formats: JPEG, JPG, SVG, WebP. Max size: 500KB.
      </p>
    </div>
  );
};

export default MainImageUploader;
