import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useParams } from "react-router-dom";

const AdminEditPropertyPage = () => {

  const { state } = useLocation();
  const { userId } = useParams();


  return (
    <motion.div
      className="h-screen text-black flex flex-col items-start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header Section */}
      <div className="w-full max-w-3xl bg-black rounded-t-2xl p-4 shadow-md mb-0">
        <div className="flex gap-2">
          {/* MacOS Buttons */}
          <div className="w-3 h-3 bg-red-500 rounded-full shadow"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full shadow"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full shadow"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full max-w-3xl bg-black rounded-b-2xl p-6 shadow-md flex flex-col">
        <h1 className="text-2xl text-white font-bold mb-6">Edit Property</h1>
        <div className="flex flex-col gap-4 items-start">
          {/* Button 1: Basic Details */}
          <Link to={`/admin/edit-details/${userId}`} state={state} >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-60 h-14 bg-gray-50 rounded-lg flex items-center justify-between px-4 text-left text-black shadow hover:shadow-lg transition"
            >
              <span className="text-lg font-medium">Basic Details</span>
              <span className="text-xl font-bold">→</span>
            </motion.div>
          </Link>

          {/* Button 2: Edit Images */}
          <Link to={`/admin/edit-images/${userId}`} state={state}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-60 h-14 bg-gray-50 rounded-lg flex items-center justify-between px-4 text-left text-black shadow hover:shadow-lg transition"
            >
              <span className="text-lg font-medium">Images</span>
              <span className="text-xl font-bold">→</span>
            </motion.div>
          </Link>

          {/* Button 3: Assignments */}
          <Link to={`/admin/edit-assignments/${userId}`} state={state} >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-60 h-14 bg-gray-50 rounded-lg flex items-center justify-between px-4 text-left text-black shadow hover:shadow-lg transition"
            >
              <span className="text-lg font-medium">Assignments</span>
              <span className="text-xl font-bold">→</span>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminEditPropertyPage;
