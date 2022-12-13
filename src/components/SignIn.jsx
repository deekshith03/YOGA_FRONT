import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { FormInput } from "./FormInput";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../axios";
import { useNavigate } from "react-router-dom";

const useStyles = createUseStyles({
  signInForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "5rem",
    border: "1px solid white",
    borderRadius: "10px",
    margin: "0.5rem",
  },

  submitBtn: {
    border: "none",
    backgroundColor: "white",
    borderRadius: "10px",
    cursor: "pointer",
    width: "100%",
    padding: "0.5vw",
    marginTop: "0.9vw",
    color: "#1B4D3E",
  },

  linkBtn: {
    background: "none",
    color: "#1B4D3E",
    textDecoration: "underline",
    border: "none",
    cursor: "pointer",
  },
});

const signInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("email required"),
  password: Yup.string().required("password required"),
});

export const SignIn = ({ handleNewUser }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const handleSubmit = async () => {
    const values = {
      email: email,
      password: password,
    };
    const isFormValid = await signInSchema.isValid(values, {
      abortEarly: false,
    });

    console.log(isFormValid);
    if (isFormValid) {
      const data = { email: email, password: password };
      axiosInstance
        .post("/api/user/login", data)
        .then((res) => {
          sessionStorage.setItem("email", res.data.email);
          sessionStorage.setItem("name", res.data.name);
          navigate("/home");
        })
        .catch((error) => {
          console.log(error);
          toast(error.response.data.error);
        });
    } else {
      signInSchema.validate(values, { abortEarly: false }).catch((err) => {
        const errors = err.inner.reduce((acc, error) => {
          return {
            ...acc,
            [error.path]: error.errors[0],
          };
        }, {});
        console.log(errors);
        toast(Object.values(errors)[0]);
      });
    }
  };
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <form>
          <div className={classes.signInForm}>
            <h2>Welcome Back !</h2>
            <FormInput
              description="Email id"
              placeholder="Enter e-mail"
              type="email"
              handleChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <FormInput
              description="Password"
              placeholder="Enter your password"
              type="password"
              handleChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              className={classes.submitBtn}
              type="button"
              onClick={() => handleSubmit()}
            >
              Log In
            </button>
          </div>
        </form>
        <div>
          <button className={classes.linkBtn} onClick={() => handleNewUser()}>
            Don't have an account? Register here.
          </button>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={5000} pauseOnHover />
    </>
  );
};
