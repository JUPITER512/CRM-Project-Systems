import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useQueryClient } from "@tanstack/react-query";
//creating authenctication context
export const AuthContext = createContext(null);

// usecontext to elimnate the import of Authcontext
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};


// here is the authProvider which will we use on root level

export default function AuthContextProvider({ children }) {
  // isAuthencticated state if true means yes else no
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const queryClient = useQueryClient();


  //it will call to get accessToken if access token exist then user is authenticated else no
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    try {
      jwtDecode(token);
      setIsAuthenticated(true);
      
    } catch (error) {
      setIsAuthenticated(false);
      localStorage.clear()
      
    }
  }, []);

  useEffect(() => {
    console.log("Auth state changed:", isAuthenticated);
    if(!isAuthenticated){
      queryClient.clear();

    }
  }, [isAuthenticated]);

  //while state is null means getting accesstoken and check it remain null which shows the loader
  if (isAuthenticated === null) {
    return <div className="loader"></div>;
  }

  return (
    // setting the value of provider to a object with state value and state setter function
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}{/* children means it will show all the components wrap insde auth provider*/}
    </AuthContext.Provider>
  );
}
