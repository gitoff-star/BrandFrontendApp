import React from "react";
import { createContext, useState } from "react";

const authContext = createContext({}); // handling object as a global state
export const AuthProvider = ({ children }) => {
  const [authToken, setAuth] = useState({});

 

  return (
    <authContext.Provider value={{ authToken, setAuth }}>{children}</authContext.Provider>
  );
};

export default authContext;