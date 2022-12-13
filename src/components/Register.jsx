import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { FormInput } from "./FormInput";
import { FiArrowLeftCircle } from "react-icons/fi";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../axios";
import { useNavigate } from "react-router-dom";

const useStyles = createUseStyles({
  RegisterForm: {
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
});

const signupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email Required"),
  name: Yup.string()
    .matches(/^[A-Za-z ]+$/, "Enter a valid name")
    .max(40)
    .min(2)
    .required(),
  age: Yup.number("must be a number").min(18).max(65).required("Age Required"),
  password: Yup.string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,16})/,
      "password must contain 8-16 characters, one Uppercase, one Lowercase, one Number and one special case character"
    ),
});

export const Register = ({ handleNewUser }) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async () => {
    const values = {
      name: name,
      email: email,
      age: age,
      password: password,
    };

    const isFormValid = await signupSchema.isValid(values, {
      abortEarly: false,
    });

    if (isFormValid) {
      axiosInstance
        .post("/api/user/register", values)
        .then((res) => {
          console.log(res);
          sessionStorage.setItem("email", res.data.email);
          sessionStorage.setItem("name", res.data.name);
          navigate("/home");
        })
        .catch((error) => {
          toast(error.response.data.error);
        });
    } else {
      signupSchema.validate(values, { abortEarly: false }).catch((err) => {
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
    <div style={{ display: "flex", flexDirection: "column" }}>
      <form>
        <div className={classes.RegisterForm}>
          <h2>Hello there !</h2>
          <FormInput
            description="Email id"
            placeholder="Enter your email-id"
            type="email"
            handleChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <FormInput
            description="name"
            placeholder="Enter your name"
            type="text"
            handleChange={(e) => setName(e.target.value)}
            value={name}
          />
          <FormInput
            description="Age"
            placeholder="Enter your age"
            type="number"
            handleChange={(e) => setAge(e.target.value)}
            value={age}
          />
          <FormInput
            description="Password"
            placeholder="atleast 8-16 length"
            type="password"
            handleChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button
            className={classes.submitBtn}
            type="button"
            onClick={() => handleSubmit()}
          >
            Register
          </button>
        </div>
      </form>
      <div>
        <FiArrowLeftCircle
          size="3em"
          style={{ cursor: "pointer" }}
          onClick={() => handleNewUser()}
        />
      </div>
      <ToastContainer position="top-center" autoClose={5000} pauseOnHover />
    </div>
  );
};
