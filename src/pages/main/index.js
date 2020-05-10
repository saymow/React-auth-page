import React from "react";
import { useAuth } from "../../contexts/auth";


export default function Main(){
  const { signOut } = useAuth();

  return(
    <div style={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center",}}>
      <button onClick={signOut}>Log Out</button>
    </div>
  )
}