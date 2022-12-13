import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { BatchTile } from "./BatchTile";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "./Modal";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { axiosInstance } from "../axios";


const useStyles = createUseStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "1vw",
    marginTop: "2vw",
  },
  topSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    fontSize: "1.5rem",
    gap: "3vw",
  },
  titleStlyes: {
    color: "#1B4D3E",
    fontSize: "2rem",
  },
  textAreaStlyes: {
    width: "25vw",
  },
  submitBtn: {
    border: "none",
    backgroundColor: "#1B4D3E",
    borderRadius: "10px",
    cursor: "pointer",
    width: "10%",
    padding: "0.5vw",
    marginTop: "0.9vw",
    color: "white",
  },
  btn: {
    border: "none",
    backgroundColor: "#1B4D3E",
    borderRadius: "10px",
    cursor: "pointer",
    width: "auto",
    padding: "0.5vw",
    marginTop: "0.9vw",
    color: "white",
  },
  centerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  enrolledContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "5vw",
  },
  paymentStyles: {
    color: "#ff3951",
    fontSize: "2rem",
    margin: 0,
  },
});
export const ClassSection = ({
  status,
  month,
  year,
  handleStatusChange,
  batches,
}) => {
  const search = (what) => batches.find((element) => element.batchId === what);

  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [dropDownOptions, setDropDownOptions] = useState([]);
  const [selectedOption, setSelectionOption] = useState();
  const [selectedBatch, setSelectedBatch] = useState(search(status.batchId));
  useEffect(() => {
    console.log(batches);
    batches.map((val) => {
      setDropDownOptions((dropDownOptions) => [
        ...dropDownOptions,
        { label: val.batchName, value: val.batchId },
      ]);
    });
  }, []);

  const handleSubmit = () => {
    const data = {
      email: sessionStorage.getItem("email"),
      batchId: selectedOption.value,
      enrolledMonth: `${month}/${year}`,
      paymentStatus: false,
    };
    axiosInstance
      .post("/api/enrollment/newenrollment", data)
      .then((res) => {
        handleStatusChange(res.data);
        setSelectedBatch(search(res.data.batchId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makePayment = () => {
    const data = {
      email: sessionStorage.getItem("email"),
      enrolledMonth: `${month}/${year}`,
    };
    axiosInstance
      .post("/api/enrollment/makepayment", data)
      .then((res) => {
        if (res.data == 1)
          handleStatusChange((status) => ({ ...status, paymentStatus: true }));
      })
      .catch((err) => {});
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.titleStlyes}>Available Batches</h1>
      <div className={classes.topSection}>
        {batches.map((batch, ind) => (
          <BatchTile data={batch} key={ind} />
        ))}
      </div>
      {status ? (
        <div style={{ marginBottom: "3vh" }}>
          <h1 className={classes.titleStlyes}>
            Enrolled batch details for current month
          </h1>
          <div className={classes.enrolledContainer}>
            <BatchTile data={selectedBatch} key={1} />
            {console.log(status)}
            {!status.paymentStatus ? (
              <div>
                <h5 className={classes.paymentStyles}>Payment Pending !!</h5>
                <button className={classes.btn} onClick={() => makePayment()}>
                  Make payment
                </button>
              </div>
            ) : (
              <h5 className={classes.paymentStyles}>Payment done</h5>
            )}
          </div>
        </div>
      ) : (
        <>
          <button
            className={classes.submitBtn}
            onClick={() => setShowModal(true)}
          >
            Enroll
          </button>
          <Modal show={showModal} setShow={setShowModal}>
            <ModalHeader>
              <h2>Enroll</h2>
            </ModalHeader>
            <ModalBody>
              <Dropdown
                onChange={(e) => setSelectionOption(e)}
                options={dropDownOptions}
                value={selectedOption}
                placeholder="Select Batch"
              />
            </ModalBody>
            <ModalFooter>
              <div className={classes.centerContainer}>
                <button onClick={() => handleSubmit()} className={classes.btn}>
                  Submit
                </button>
              </div>
            </ModalFooter>
          </Modal>
        </>
      )}
    </div>
  );
};
