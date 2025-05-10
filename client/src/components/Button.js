import React from 'react';

function Button ({ label, onClick, variant }) {
  const BTN_STYLES ={
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    success: "bg-green-500 text-white hover:bg-green-600",
    tertiary: "bg-orange-500 text-white hover:bg-orange-600",
    link: "text-blue-500 hover:underline",
    diasbled: "bg-gray-300 text-gray-500 cursor-not-allowed",
  }

  return (
    <button
      type='button'
      onClick={onClick}
      className={`px-6 py-2 rounded-full ${BTN_STYLES[variant]} `}>
      {label}
    </button>
  );
}

export default Button;