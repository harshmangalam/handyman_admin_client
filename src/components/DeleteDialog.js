import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import axios from "axios";
import { useUIDispatch } from "../context/ui";

function DeleteDialog({ url }) {
  const [open, setOpen] = React.useState(false);
  const uiDispatch = useUIDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(url);
      uiDispatch("SNACKBAR", {
        open: true,
        type: res.data.type,
        msg: res.data.message,
      });
      window.location.reload()

      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <Delete />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are You sure want to delete
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteDialog;
