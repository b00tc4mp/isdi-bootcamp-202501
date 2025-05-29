"use client";

import React from "react";
import { animate } from "framer-motion";

const ScrollToProperties = ({ children, className }) => {
  const handleScroll = () => {
    console.log("Scrolling to properties section...");
    const propertiesSection = document.getElementById("properties");
    if (propertiesSection) {
      const targetPosition = propertiesSection.offsetTop;
      const startPosition = window.pageYOffset;

      animate(startPosition, targetPosition, {
        duration: 1.5, // Duración en segundos
        onUpdate: (value) => {
          window.scrollTo(0, value);
        },
        ease: "easeInOut",
      });
    }
  };

  return (
    <button onClick={handleScroll} className={className}>
      {children}
    </button>
  );
};

export default ScrollToProperties;
