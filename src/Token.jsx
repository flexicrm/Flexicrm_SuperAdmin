// export const AuthProvider = ({ children }) => {
//     console.log(children,"token")
//     const accessToken = localStorage.getItem("accessToken");

//     const headers = {
//       Authorization: `Bearer ${accessToken}`,
//     };

//     return (
//       <AuthContext.Provider value={headers}>{children}</AuthContext.Provider>
//     );
//   };
import React from "react";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
export const Token = () => {
  const headers = useContext(AuthContext);
  console.log(headers, "token");
  return (
    <div>
      <h1>Token</h1>
      <p>{headers.Authorization}</p>
    </div>
  );
};
export default Token;
