import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../axios";

const useStyles = createUseStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "1vw",
    marginTop: "2vw",
    justifyContent: "center",
    alignItems: "center",
  },
  titleStlyes: {
    color: "#1B4D3E",
    fontSize: "1.5rem",
  },
  submitBtn: {
    border: "none",
    backgroundColor: "#1B4D3E",
    borderRadius: "10px",
    cursor: "pointer",
    padding: "0.8vw",
    marginTop: "0.9vw",
    color: "white",
    fontSize: "1.2rem",
  },
  inputstyles: {
    margin: "0.5rem 0",
    padding: "1rem",
    border: "none",
    width: "15vw",
    fontSize: "1.2rem",
  },
  dropDownStyles: {
    margin: "0.5rem 0",
    width: "15vw",
    fontSize: "1.2rem",
  },
  "@media only screen and (max-device-width: 480px)": {
    inputstyles: {
      width: "auto",
    },
    dropDownStyles: {
      width: "auto",
    },
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
  },
});

const scheduleSchema = Yup.object().shape({
  date: Yup.string().required("Date Required"),
  selectedOption: Yup.object().required("Batch Required"),
});

export const ScheduleSection = ({ month, year, batches }) => {
  const classes = useStyles();
  const flag = (month + 1) % 12 !== 0 ? true : false;
  let startYear = flag && year + 1;
  let startMonth = flag && (month + 1) % 12;
  startMonth =
    startMonth < 10 ? "0" + startMonth.toString() : startMonth.toString();
  const [selectedval, setSelectedVal] = useState(`${startYear}-${startMonth}`);
  const [dropDownOptions, setDropDownOptions] = useState([]);
  const [selectedOption, setSelectionOption] = useState();

  useEffect(() => {
    console.log(batches);
    batches.map((val) => {
      setDropDownOptions((dropDownOptions) => [
        ...dropDownOptions,
        { label: val.batchName, value: val.batchId },
      ]);
    });
  }, []);

  const handleSubmit = async () => {
    console.log(selectedval);
    let date = selectedval.split("-");
    date = `${date[1]}/${date[0]}`;

    const values = {
      date: date,
      selectedOption: selectedOption,
    };
    const isFormValid = await scheduleSchema.isValid(values, {
      abortEarly: false,
    });

    if (isFormValid) {
      console.log(selectedOption);
      const data = {
        email: sessionStorage.getItem("email"),
        batchId: selectedOption.value,
        enrolledMonth: date,
      };
      console.log(data);
      axiosInstance
        .post("/api/enrollment/newenrollment", data)
        .then((res) => {
          toast("Sucessfully Completed");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      scheduleSchema.validate(values, { abortEarly: false }).catch((err) => {
        const errors = err.inner.reduce((acc, error) => {
          return {
            ...acc,
            [error.path]: error.errors[0],
          };
        }, {});

        toast(Object.values(errors)[0]);
      });
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.titleStlyes}>
        <h1>Choose the Month and Year</h1>
      </div>
      <input
        type="month"
        id="start"
        name="start"
        min={`${startYear}-${startMonth}`}
        onChange={(e) => setSelectedVal(e.target.value)}
        className={classes.inputstyles}
        value={selectedval}
      />
      <Dropdown
        onChange={(e) => setSelectionOption(e)}
        options={dropDownOptions}
        value={selectedOption}
        placeholder="Select Batch"
        className={classes.dropDownStyles}
      />
      <button
        type="button"
        onClick={() => handleSubmit()}
        className={classes.submitBtn}
      >
        Change Schedule
      </button>
      <ToastContainer position="bottom-center" autoClose={1000} pauseOnHover />
    </div>
  );
};
