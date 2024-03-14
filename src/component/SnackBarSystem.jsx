import { useDispatch, useSelector } from "react-redux";
import { hideMessage, getSnackbar } from "../data/store";
import { Alert, Snackbar } from "@mui/material";

export default function SnackBarSystem() {
  const dispatch = useDispatch();
  const { isOpen, message, severity } = useSelector(getSnackbar);
  const handleClose = () => {
    dispatch(hideMessage());
  };
  if (message.trim() == "") {
    return null;
  }
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      {message.trim() !== "" && (
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      )}
    </Snackbar>
  );
}
