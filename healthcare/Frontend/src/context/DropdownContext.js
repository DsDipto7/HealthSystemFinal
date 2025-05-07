// src/context/DropdownContext.js
import React, { createContext, useState } from "react";

export const DropdownContext = createContext();

export const DropdownProvider = ({ children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <DropdownContext.Provider value={{ isDropdownOpen, setIsDropdownOpen }}>
      {children}
    </DropdownContext.Provider>
  );
};
