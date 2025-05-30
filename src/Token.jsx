export const AuthProvider = ({ children }) => {
    console.log(children,"token")
    const accessToken = localStorage.getItem("accessToken");
  
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  
    return (
      <AuthContext.Provider value={headers}>{children}</AuthContext.Provider>
    );
  };
  