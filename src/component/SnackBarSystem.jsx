import {useDispatch, useSelector} from "react-redux";
import {hideMessage, getSnackbar} from "../data/store";
import {Alert, Snackbar} from "@mui/material";

export default function SnackBarSystem() {
    const dispatch = useDispatch();
    const { message, isOpen, severity } = useSelector(getSnackbar);
    const handleClose = () => {
        dispatch(hideMessage());
    };
    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
}