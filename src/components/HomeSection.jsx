import React, { useEffect } from "react";
import { createUseStyles } from "react-jss";
import accounts from "../../public/Accounts_bg.png";

const useStyles = createUseStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "1vw",
  },
  leftSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.5rem",
  },
  titleStlyes: {
    color: "#1B4D3E",
  },
  textAreaStlyes: {
    width: "25vw",
  },
  submitBtn: {
    border: "none",
    backgroundColor: "#1B4D3E",
    borderRadius: "10px",
    cursor: "pointer",
    width: "25%",
    padding: "0.5vw",
    marginTop: "0.9vw",
    color: "white",
  },
});

export const HomeSection = ({ status, handleClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.leftSection}>
        <div className={classes.textContainer}>
          <h1 className={classes.titleStlyes}>
            Welcome {sessionStorage.getItem("name")},
          </h1>
          <div className={classes.textAreaStlyes}>
            Hope you are having a great day lets pick up from where you left off
            !!
            {!status && (
              <>
                <p>
                  Looks like you have not enrolled in any batch in the current
                  month
                </p>
                <button
                  className={classes.submitBtn}
                  onClick={() => handleClick("Class")}
                >
                  Enroll
                </button>
              </>
            )}
            {status && (
              <>
                <p>
                  seems like you have already enrolled in a yoga class please
                  navigate to the chosen batch by clicking here
                </p>
                <button
                  className={classes.submitBtn}
                  onClick={() => handleClick("Class")}
                >
                  Go to class
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={classes.rightSection}>
        <img src={accounts}></img>
      </div>
    </div>
  );
};
