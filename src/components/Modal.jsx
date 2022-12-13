import { useEffect, useRef } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  modal: {
    opacity: 0,
    visibility: "hidden",
    display: "none",
  },

  modalActive: {
    display: "block",
    position: "fixed",
    opacity: 1,
    visibility: "visible",
    zIndex: 1,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    overflow: "auto",
    transition: "0.3s ease-in-out",
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  modal__content: {
    width: "500px",
    margin: "15% auto",
    backgroundColor: "#d8d3cd",
    borderRadius: "5px",
    position: "relative",
    transition: "inherit",
    opacity: 1,
    visibility: "visible",
    transform: "translateY(0)",
    color: "#1B4D3E",
  },

  close: {
    position: "absolute",
    top: "16px",
    right: "20px",
    fontSize: "1.5rem",
    cursor: "pointer",
    color: "#7f7f7f",
    "&:hover": {
      color: "#000",
    },
  },

  modal__header: {
    padding: "16px 20px",
  },

  modal__body: {
    padding: "16px 20px",
  },
  modal__footer: {
    padding: "16px 20px",
  },
});
const Modal = (props) => {
  const modalRef = useRef();
  const classes = useStyles();

  useEffect(() => {
    const clickOutsideContent = (e) => {
      if (e.target === modalRef.current) {
        props.setShow(false);
      }
    };
    window.addEventListener("click", clickOutsideContent);
    return () => {
      window.removeEventListener("click", clickOutsideContent);
    };
  }, [props]);

  return (
    <div
      ref={modalRef}
      className={props.show ? classes.modalActive : classes.modal}
    >
      <div className={classes.modal__content}>
        {!props.hideCloseButton && (
          <span onClick={() => props.setShow(false)} className={classes.close}>
            &times;
          </span>
        )}
        {props.children}
      </div>
    </div>
  );
};

export default Modal;

export const ModalHeader = (props) => {
  const classes = useStyles();
  return <div className={classes.modal__header}>{props.children}</div>;
};

export const ModalBody = (props) => {
  const classes = useStyles();
  return <div className={classes.modal__body}>{props.children}</div>;
};

export const ModalFooter = (props) => {
  const classes = useStyles();
  return <div className={classes.modal__footer}>{props.children}</div>;
};
