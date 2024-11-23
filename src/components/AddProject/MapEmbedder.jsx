import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Field } from "formik";

const MapEmbedder = ({ onChange, value, clearForm,name }) => {
  const [googleMapUrl, setGoogleMapUrl] = useState(value || "");
  const [cutLink, setCutLink] = useState("");
  const [isValid, setIsValid] = useState(false); // State to track if the URL is valid
  const [isDelayed, setIsDelayed] = useState(false); // Track if animation delay is over

  // Function to extract and cut the base Google Maps URL (remove extra attributes)
  const generateCutLink = (url) => {
    const regex = /(https:\/\/www\.google\.com\/maps\/embed\?pb=[^"]+)/;
    const match = url.match(regex);

    if (match && match[1]) {
      return match[1]; // Return the base URL with the embedded pb query parameters
    }
    return ""; // Return an empty string if the URL is not valid
  };

  // Handle URL change and update both internal state and parent form state
  const handleUrlChange = (e) => {
    const value = e.target.value;
    setGoogleMapUrl(value);

    // Generate the cut URL from the input value
    const newCutLink = generateCutLink(value);
    setCutLink(newCutLink); // Update cutLink state

    // Check if the URL is valid and trigger animation delay
    if (newCutLink) {
      setIsValid(true);
      setIsDelayed(false); // Reset delay state if a valid URL is entered
    } else {
      setIsValid(false);
    }

    // Update the parent form state with the cut URL
    onChange(name,newCutLink);
  };

  // Automatically update the cut link on initial mount (if `value` is pre-filled)
  useEffect(() => {
    if (value) {
      const newCutLink = generateCutLink(value);
      setCutLink(newCutLink); // Set initial cutLink
      if (newCutLink) setIsValid(true); // Validate if the initial value is valid
    }
  }, [value]);

  // Clear all state when clearForm changes
  useEffect(() => {
    if (clearForm) {
      // Reset the form state
      setGoogleMapUrl(""); // Clear the URL input
      setCutLink(""); // Clear the embedded map link
      setIsValid(false); // Reset validation status
      setIsDelayed(false); // Reset delayed animation state
      onChange(name,''); // Notify parent form about the cleared state
    }
  }, [clearForm, onChange]);

  // Delay animation to show after a brief pause (debounce effect)
  useEffect(() => {
    if (isValid) {
      const timer = setTimeout(() => {
        setIsDelayed(true); // Set delayed animation state to true
      }, 500); // Delay the animation by 500ms

      return () => clearTimeout(timer); // Cleanup the timer on component unmount or change
    }
  }, [isValid]);

  return (
    <div className="map-embedder mt-4">
      <label className="block sf-medium font-medium text-sm text-[#000000] mb-2">
        Google Maps URL:
      </label>
      <Field
        className="border sf-medium  border-gray-300 p-2 text-sm font-medium sf-medium rounded-md w-full"
        value={googleMapUrl}
        name={name}
        onChange={handleUrlChange}
        placeholder="Enter Google Maps URL"
      />

      {/* Display the embedded map iframe with motion animation */}
      {cutLink && isDelayed && (
        <div className="mt-6">
          <label className="block text-sm font-medium mb-2">View Map:</label>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} // Initial state (hidden and scaled down)
            animate={{ opacity: 1, scale: 1 }} // Final state (fully visible and normal size)
            transition={{ duration: 0.5 }} // Duration of the animation
          >
            <iframe
              width="600"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              src={cutLink}
              title="Google Map"
            ></iframe>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MapEmbedder;
