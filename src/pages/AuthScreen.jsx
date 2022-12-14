import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { Register } from "../components/Register";
import { SignIn } from "../components/SignIn";
import { useNavigate } from "react-router-dom";

const useStyles = createUseStyles({
  container: {
    textAlign: "center",
    display: "flex",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center",
    color: "#1B4D3E",
    backgroundImage:
      "url(https://t4.ftcdn.net/jpg/04/18/22/99/360_F_418229940_kGUrDlUICbF4Cwb7CvMFoPTD3rQZJWRu.jpg)",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    gap: "8vw",
    margin: 0,
  },

  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },

  headingStyles: {
    width: "fit-content",
  },
  paraStyles: {
    width: "17vw",
    textAlign: "left",
  },

  "@media only screen and (max-device-width: 480px)": {
    container: {
      textAlign: "center",
      display: "flex",
      flexDirection: "column-reverse",
      minHeight: "100vh",
      alignItems: "center",
      justifyContent: "center",
      color: "#1B4D3E",
      backgroundImage:
        "url(https://t4.ftcdn.net/jpg/04/18/22/99/360_F_418229940_kGUrDlUICbF4Cwb7CvMFoPTD3rQZJWRu.jpg)",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      gap: "0vw",
      margin: 0,
    },
    paraStyles: {
      width: "90vw",
      textAlign: "left",
    },
    headingStyles: {
      width: "fit-content",
      textAlign: "center",
    },
    textContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
  },
});
function AuthScreen() {
  const classes = useStyles();
  const [newUser, setNewUser] = useState(false);
  let navigate = useNavigate();
  const handleNewUser = () => {
    setNewUser((newUser) => !newUser);
  };

  console.log(import.meta.env.VITE_BASE_URL, "hello");

  useEffect(() => {
    if (
      sessionStorage.getItem("email") !== null &&
      sessionStorage.getItem("name") !== null
    ) {
      navigate("/home");
    }
  }, []);

  return (
    <div className={classes.container}>
      {!newUser ? (
        <SignIn handleNewUser={handleNewUser} />
      ) : (
        <Register handleNewUser={handleNewUser} />
      )}
      <div className={classes.textContainer}>
        <h1 className={classes.headingStyles}>Yogi yoga center</h1>
        <p className={classes.paraStyles}>
          Hey there you are one step away from joining into a simple and easy
          way to start your yoga journey from footsteps of your home !!
        </p>
      </div>
    </div>
  );
}

export default AuthScreen;
