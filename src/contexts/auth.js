import React, { createContext, useState, useEffect, useContext } from "react";
import * as auth from "../services/auth";
import api from "../services/api";


const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [ user, setUser ] = useState(null);

  async function signIn(data) {
    const response = await auth.signIn(data);
    
    setUser(response.user);

    api.defaults.headers["Authorization"] = `Bearer ${response.token}`;
    
    localStorage.setItem("@Auth:user", JSON.stringify(response.user));
    localStorage.setItem("@Auth:token", response.token);
  }

  function signOut() {
    setUser(null);
  }

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await localStorage.getItem("@Auth:user");
      const storagedToken = await localStorage.getItem("@Auth:token");

      if (storagedToken && storagedUser){
        setUser(JSON.parse(storagedUser));
        api.defaults.headers["Authorization"] = `Bearer ${storagedToken}`;
      }
    }

    loadStoragedData()
  }, [])
  
  return(
    <AuthContext.Provider value={{signed : Boolean(user), user, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  )
} 

export default AuthContext;

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}