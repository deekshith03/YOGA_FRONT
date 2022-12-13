import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { MenuOption } from "../components/MenuOption";
import { HomeSection } from "../components/HomeSection";
import { ClassSection } from "../components/ClassSection";
import { ScheduleSection } from "../components/ScheduleSection";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../axios";
const useStyles = createUseStyles({
  homeContainer: {
    marginLeft: "10vw",
    marginRight: "10vw",
    paddingTop: "2.5rem",
    // backgroundColor: "#e2dd9",
  },
  title: {
    textAlign: "center",
    marginBottom: "2rem",
    textTransform: "uppercase",
    fontSize: "2.5rem",
  },
  underline: {
    width: "5rem",
    height: "0.5rem",
    background: "#ff3951",
    marginLeft: "auto",
    marginRight: "auto",
  },

  buttonContainer: {
    marginBottom: "4rem",
    display: "flex",
    justifyContent: "center",
  },
  bodyStyles: {
    backgroundImage:
      "url(https://img.freepik.com/free-vector/background-template-with-mandala-pattern-design_1308-43584.jpg?w=1800&t=st=1670868756~exp=1670869356~hmac=5e2f201546e700c8f459e7b5d5bd8163b7b077cefc00f0d05cb715630d0391ca)",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "100vh",
  },
});
export const HomeScreen = () => {
  const classes = useStyles();
  const [menuChoice, setmenuChoice] = useState("Home");
  const [status, setStatus] = useState("");
  const [batches, setBatches] = useState([]);
  let navigate = useNavigate();
  let month = new Date().getMonth() + 1;
  month = month < 10 ? "0" + month.toString() : month.toString();
  let year = new Date().getFullYear();

  useEffect(() => {
    if (!sessionStorage.getItem("email") || !sessionStorage.getItem("name")) {
      navigate("/");
    } else {
      axiosInstance
        .post("/api/enrollment/getenrollmentstatus", {
          email: sessionStorage.getItem("email"),
          enrolledMonth: `${month}/${year}`,
        })
        .then((res) => {
          console.log(res);
          setStatus(res.data);
        })
        .catch((error) => {
          console.log(error);
          toast(error.response.data.error);
        });
    }
  }, []);
  useEffect(() => {
    axiosInstance
      .get("/api/batches/getdetails")
      .then((res) => {
        console.log(res.data);
        setBatches([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleMenuClick = (val) => {
    setmenuChoice(val);
  };
  return (
    <div className={classes.bodyStyles}>
      <div className={classes.homeContainer}>
        <div className={classes.title}>
          <h2 style={{ margin: "0vw" }}>Yogi</h2>
          <div className={classes.underline}></div>
        </div>
        <div className={classes.buttonContainer}>
          <MenuOption
            value={"Home"}
            handleClick={(val) => handleMenuClick(val)}
            menuChoice={menuChoice}
          />
          <MenuOption
            value={"Schedule"}
            handleClick={(val) => handleMenuClick(val)}
            menuChoice={menuChoice}
          />
          <MenuOption
            value={"Class"}
            handleClick={(val) => handleMenuClick(val)}
            menuChoice={menuChoice}
          />
        </div>
        {menuChoice === "Home" && (
          <HomeSection
            status={status}
            handleClick={(val) => handleMenuClick(val)}
          />
        )}
        {menuChoice === "Schedule" && (
          <ScheduleSection year={year} month={month} batches={batches} />
        )}
        {menuChoice === "Class" && (
          <ClassSection
            status={status}
            month={month}
            year={year}
            batches={batches}
            handleStatusChange={(e) => setStatus(e)}
          />
        )}
      </div>
    </div>
  );
};
