import React from 'react';
import { FaPaw } from 'react-icons/fa';  // Using react-icons for a paw print icon

export default function Logo() {
  return (
    <div className="w-full h-[120px] bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center px-6">
      {/* Logo Container with Flexbox for Alignment */}
      <div className="flex items-center gap-3">
        {/* Icon: Paw Icon with subtle hover effect */}
        <FaPaw className="text-white text-6xl hover:text-gray-200 transition-all duration-300" />
        
        {/* Brand Name */}
        <h1 className="text-white text-5xl font-bold tracking-wider uppercase hover:text-gray-200 transition-all duration-300">
          Pet Clinic
        </h1>
      </div>
    </div>
  );
}

