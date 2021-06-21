import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Switch,
  Typography,
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import React, { useState } from "react";
import axios from "axios";
import { useUIDispatch } from "../context/ui";

function UserModel({ user }) {
  console.log(user);
  const [open, setOpen] = React.useState(false);
  const [block, setBlock] = useState(false);
  const [role, setRole] = useState(user?.role || "");

  const uiDispatch = useUIDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`/user/${user._id}`, {
        isBlocked: block,
        role,
      });
      uiDispatch("SNACKBAR", {
        open: true,
        type: res.data.type,
        msg: res.data.message,
      });
      window.location.reload();

      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <Edit />
      </IconButton>
      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <Typography>
                Block User
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={block}
                    onChange={(e) => setBlock(e.target.checked)}
                    name="block"
                  />
                }
                label="Block"
              ></FormControlLabel>
            </Grid>
            <Grid item>
              <FormControl component="fieldset">
                <FormLabel component="legend">Change Role</FormLabel>
                <RadioGroup
                  aria-label="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <FormControlLabel
                    value="CUSTOMER"
                    control={<Radio />}
                    label="Customer"
                  />
                  <FormControlLabel
                    value="TASKER"
                    control={<Radio />}
                    label="Tasker"
                  />
                  <FormControlLabel
                    value="ADMIN"
                    control={<Radio />}
                    label="Admin"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary" autoFocus>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserModel;
