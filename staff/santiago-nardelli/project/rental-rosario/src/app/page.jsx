"use client";

import React from "react";

const ScrollToProperties = ({ children, targetRef }) => {
  const handleClick = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error("Referencia al objetivo del scroll no está disponible.");
    }
  };

  return (
    <button onClick={handleClick} className={children.props.className}>
      {children}
    </button>
  );
};

export default ScrollToProperties;
