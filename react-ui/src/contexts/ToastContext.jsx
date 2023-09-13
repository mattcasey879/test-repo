import { Alert, AlertTitle, Slide, Snackbar } from "@mui/material";
import React, { createContext, useState } from "react";
import { formatLabel } from "../utils/helpers";

export const ToastContext = createContext();

export const ToastProvider = ({ children, ...props }) => {
  const initialToast = {
    message: "",
    severity: "",
  };
  const [toast, setToast] = useState(initialToast);
  const [open, setOpen] = useState(false);

  const showToast = (toast) => {
    setToast(toast);
    setOpen(true);
  };

  const authErrorToast = () => {
    setToast({
      message: "Authentication Error. Login Again.",
      severity: "error",
    });
    setOpen(true);
    props.setLoggedIn(false);
  };

  const closeToast = (event, reason) => {
    if (reason === 'clickaway') {
      return 
    }
    setOpen(false);
  };

  const toastTransition = (props) => {
    return <Slide {...props} direction="down" />;
  };

  const toastStyle = {
    padding: "5%",
    color: toast.severity === "error" ? "red" : "green",
    width: "24rem",
    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.25)",
    opacity: "0.90",
  };

  return (
    <ToastContext.Provider value={{ showToast, authErrorToast }}>
      {children}
      {open && (
        <Snackbar
          autoHideDuration={5000}
          TransitionComponent={toastTransition}
          transitionDuration={500}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          onClose={closeToast}
        >
          <Alert sx={toastStyle} onClose={closeToast} severity={toast.severity}>
            <AlertTitle sx={{fontWeight: "bold"}}>{formatLabel(toast.severity)}!</AlertTitle>
            {toast.message}
          </Alert>
        </Snackbar>
      )}
    </ToastContext.Provider>
  );
};
