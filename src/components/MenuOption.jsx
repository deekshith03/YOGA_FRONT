import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  filterBtn: {
    background: "transparent",
    borderColor: "transparent",
    fontSize: "1rem",
    textTransform: "capitalize",
    margin: "0 0.5rem",
    letterSpacing: "1px",
    padding: "0.375rem 0.75rem",
    color: "#c59d5f",
    cursor: "pointer",
    transition: "all .3s linear",
    borderRadius: "0.25rem",
  },
  underline: {
    width: "1.5rem",
    height: "0.2rem",
    background: "#ff3951",
    marginLeft: "auto",
    marginRight: "auto",
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
});

export const MenuOption = ({ value, handleClick, menuChoice }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <button
        type="button"
        class={classes.filterBtn}
        value={value}
        onClick={(e) => handleClick(e.target.value)}
      >
        {value}
      </button>
      {menuChoice === value && <div className={classes.underline}></div>}
    </div>
  );
};
