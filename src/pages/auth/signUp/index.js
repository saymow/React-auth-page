import React, { useRef } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Form } from "@unform/web";

import Input from "./../../../components/form/input";
import { useAuth } from "../../../contexts/auth";
import ImgSlider from "./../../../components/authImageSlider";

import "./../styles.css";

export default function SignUp() {
  const formRef = useRef(null);
  const { signIn } = useAuth();
  
  function signUp(data){
    
    /* API REQUEST TO REGISTER */

    let signInData = {
      email: data.email,
      password: data.password,
    } 

    signIn(signInData);
  }

  async function submitHandler(data, { reset }){
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("Email is necessary.")
          .email("Invalid email.")
          .max(320, "Email too long."),
        
        username: Yup.string()
          .required("Username is necessary.")
          .min(3, "Must be 3 characters or more.")
          .max(18, "Username too loong."),
        
        name: Yup.string()
          .required("Name is necessary.")
          .min(6, "Must be 6 characters or more.")
          .max(255, "Name too loong."),
        
        password: Yup.string()
          .required("Password is necessary.")
          .min(8, "Password is too weak")
          .max(16, "Password too loong."),
      });

      formRef.current.setErrors({});
            
      reset();

      await schema.validate(data, {
        abortEarly: false,
      })

      signUp(data);

    } catch (err) {
      if (err instanceof Yup.ValidationError){
        const errorMessage = {}
        
        err.inner.forEach(error => {
          errorMessage[error.path] = error.message;
        })

        console.log(err)

        formRef.current.setErrors(errorMessage);
      }
    }
  }

  return(
    <div className="authContainer">
      <div className="authEl">
        <div className="authHeaderEl">
          Already have an account? <Link to="/login">Login</Link>
        </div>
        <div className="authFormWrapperEl">
          <div className="authDescriptionEl">
            <h2>Register</h2>
            <p>Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.
            </p>
          </div> 
          <Form ref={formRef} className="authFormEl" onSubmit={submitHandler}>
            <div className="authFormDivEl">
              <Input 
                className="authInputEl" 
                name="name" 
                id="name" 
                placeholder="Name"
              />
            </div>
            <div className="authFormDivEl">
              <Input 
                className="authInputEl" 
                name="username" 
                id="username" 
                placeholder="Username"
              />
            </div>
            <div className="authFormDivEl">
              <Input 
                className="authInputEl" 
                type="email"
                name="email" 
                id="email" 
                placeholder="Email"
              />
            </div>
            <div className="authFormDivEl">
              <Input 
                className="authInputEl" 
                type="password" 
                name="password" 
                id="password" 
                placeholder="Password"
              />
            </div>
            <button>Sign up</button>
          </Form>
        </div>
        <p></p>
      </div>
      <ImgSlider />
    </div>
  )
}
