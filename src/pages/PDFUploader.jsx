import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";

// Load the PDF worker from the CDN
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFUploader = ({
  name = "pdfFile",
  required = true,
  onChange,
  value,
  clearForms,
  maxFileSize = 2 * 1024 * 1024, // 2MB
}) => {
  const [pdfFile, setPdfFile] = useState(value || null);
  const [pdfUrl, setPdfUrl] = useState(null); // URL for preview
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadError, setUploadError] = useState(false); // Flag for upload failure

  const supportedFormats = ["application/pdf"];

  const handleFile = async (file) => {
    // Validate file type
    if (!supportedFormats.includes(file.type)) {
      setErrorMessage("Unsupported file format! Only PDF files are allowed.");
      setUploadError(false);
      return;
    }

    // Validate file size
    if (file.size > maxFileSize) {
      setErrorMessage(`File size exceeds the 2MB limit.`);
      setUploadError(false);
      return;
    }

    // Clear any previous errors
    setErrorMessage("");
    setUploadError(false);
    setLoading(true);

    try {
      // Generate a preview URL for the PDF
      const previewUrl = URL.createObjectURL(file);

      setPdfUrl(previewUrl); // Set the preview URL
      setPdfFile({ file, name: file.name }); // Store the file

      // Simulate an upload process
    //   await simulateUpload(file); // Replace with actual API call
      onChange(name, file); // Update parent component or Formik state
    } catch (error) {
      setUploadError(true); // Mark the upload as failed
      setErrorMessage("Failed to upload the PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const simulateUpload = (file) => {
    return new Promise((resolve, reject) => {
      // Simulate success or failure (30% chance of failure)
      setTimeout(() => {
        Math.random() > 0.7 ? reject(new Error("Upload failed")) : resolve("Upload successful");
      }, 1500);
    });
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

  const handleDeletePDF = () => {
    setPdfFile(null); // Remove the file
    setPdfUrl(null); // Clear the preview URL
    setUploadError(false); // Clear upload error
    setErrorMessage(""); // Clear any errors
    onChange(name, null); // Clear value in Formik or parent
  };

  useEffect(() => {
    setPdfFile(null); // Clear the file
    setPdfUrl(null); // Clear the preview URL
    setUploadError(false); // Clear upload error
    setErrorMessage(""); // Clear errors
    onChange(name, null); // Clear value in Formik or parent
  }, [clearForms]);

  return (
    <div
      className="flex flex-col gap-4 mt-8"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <label className="sf-medium font-medium text-sm text-[#000000]">
        PDF File {required && <span className="text-lg text-red-600">*</span>}
      </label>

      {/* Drag-and-Drop Area */}
      <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center">
        <p className="text-sm text-gray-500">
          Drag & drop a PDF file here or{" "}
          <label className="text-blue-500 underline cursor-pointer">
            browse
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </label>
        </p>
      </div>

      {/* Error Message */}
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

      {/* PDF Preview */}
      {pdfFile && pdfUrl && (
        <div className="relative">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative w-fit"
            >
              <div className="w-80 h-64 bg-gray-100 flex items-center justify-center rounded-lg shadow-lg overflow-hidden">
                {/* <Document file={pdfUrl} loading="Loading PDF...">
                  <Page pageNumber={1} width={300} />
                </Document> */}

                  <iframe
          src={pdfUrl}
          width="100%"
          height="100%"
          title="PDF Preview"
        />
              </div>
              <button
                type="button"
                onClick={handleDeletePDF}
                className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Upload Error Message */}
          {uploadError && (
            <p className="text-red-500 text-sm mt-2">
              Failed to upload the PDF. Please try again.
            </p>
          )}
        </div>
      )}

      {/* Skeleton Loader */}
      {loading && (
        <div className="w-48 h-48 bg-gray-200 rounded-lg animate-pulse"></div>
      )}

      {/* Instructions */}
      <p className="text-xs text-gray-500">Supported format: PDF. Max size: 2MB.</p>
    </div>
  );
};

export default PDFUploader;
