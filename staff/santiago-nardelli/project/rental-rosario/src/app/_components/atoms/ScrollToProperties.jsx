"use client";

import React from "react";

const ScrollPropertiesFind = ({ children, className }) => {
  const handleClick = () => {
    const propertiesSection = document.getElementById("properties");
    if (propertiesSection) {
      propertiesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
};

export default ScrollPropertiesFind;
