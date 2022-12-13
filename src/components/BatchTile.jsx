import React from "react";
import { createUseStyles } from "react-jss";
import batchIcon from "../../public/learnmore-1.png";

const useStyles = createUseStyles({
  card: {
    borderRadius: "10px",
    width: "11vw",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: "0.3s",
    borderColor: "#1B4D3E",
  },
  imageStyles: {
    width: "100%",
  },

  body: {
    padding: "2px 16px",
  },
  title: {
    textAlign: "center",
    color: "#ff3951",
    textTransform: "capitalize",
  },
  textArea: {
    textAlign: "center",
    color: "#1B4D3E",
  },
});

export const BatchTile = ({ data }) => {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <img src={batchIcon} alt="Avatar" className={classes.imageStyles}></img>
      <div className={classes.body}>
        <div className={classes.title}>
          <h5>{data.batchName}</h5>
        </div>
        <div className={classes.textArea}>
          <p style={{ margin: 0 }}>From : {data.from}</p>
          <p style={{ margin: 0 }}>To : {data.to}</p>
        </div>
      </div>
    </div>
  );
};
