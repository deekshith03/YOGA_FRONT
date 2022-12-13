import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { axiosInstance } from "../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = createUseStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderRadius: "10px",
    width: "20vw",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: "0.3s",
    borderColor: "#1B4D3E",
  },
  imageStyles: {
    width: "100%",
  },

  body: {
    padding: "10px 16px",
  },
  title: {
    textAlign: "center",
    color: "#ff3951",
    fontSize: "2rem",
  },
  textArea: {
    textAlign: "center",
    color: "#1B4D3E",
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
  payBtn: {
    border: "solid 3px",
    borderColor: "#1B4D3E",
    cursor: "pointer",
    width: "25%",
    color: "#1B4D3E",
    background: "transparent",
  },
  emptyContainer: {
    width: "25vw",
    marginTop: "12vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  tileTitle: {
    padding: "0.2vw",
    display: "flex",
    justifyContent: "space-around",
    color: "#1B4D3E",
  },
  "@media only screen and (max-device-width: 480px)": {
    submitBtn: {
      border: "none",
      backgroundColor: "#1B4D3E",
      borderRadius: "10px",
      cursor: "pointer",
      width: "100%",
      padding: "3.5vw",
      marginTop: "4.9vw",
      color: "white",
    },
    tileTitle: {
      gap: "14vw",
      padding: "4.2vw",
    },
    card: {
      width: "90vw",
    },
  },
});

export const PaymentsLogSection = ({
  handleClick,
  status,
  handleStatusChange,
}) => {
  const classes = useStyles();
  const [logs, setLogs] = useState([]);
  console.log(status);

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    axiosInstance
      .get(`/api/enrollment/getenrollments/${email}`)
      .then((res) => {
        setLogs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const makePayment = (enrolledMonth) => {
    const data = {
      email: sessionStorage.getItem("email"),
      enrolledMonth: enrolledMonth,
    };
    axiosInstance
      .post("/api/enrollment/makepayment", data)
      .then((res) => {
        if (res.data == 1) {
          if (status.enrolledMonth === enrolledMonth) {
            handleStatusChange((status) => ({
              ...status,
              paymentStatus: true,
            }));
          }
          setLogs((logs) =>
            logs.filter((item) => item.enrolledMonth !== enrolledMonth)
          );
          toast("Successfully Paid");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.container}>
      {logs.length > 0 ? (
        <div className={classes.card}>
          <div className={classes.body}>
            {logs.map((val, ind) => {
              return (
                <div className={classes.tileTitle} key={ind}>
                  <h5 style={{ margin: "0.5vw" }}>{val.enrolledMonth}</h5>

                  <button
                    className={classes.payBtn}
                    onClick={() => {
                      makePayment(val.enrolledMonth);
                    }}
                  >
                    Pay
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={classes.emptyContainer}>
          <h5 className={classes.title}>No payments due !!</h5>
          <button
            className={classes.submitBtn}
            onClick={() => handleClick("Class")}
          >
            Go to class
          </button>
        </div>
      )}
      <ToastContainer position="bottom-center" autoClose={1000} pauseOnHover />
    </div>
  );
};
