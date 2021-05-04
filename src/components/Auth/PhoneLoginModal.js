import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Typography,
  DialogTitle,
} from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import { useFormik } from "formik";
import { Fragment, useState } from "react";

import axios from "axios";

import * as Yup from "yup";
import { useUIDispatch } from "../../context/ui";
import { useRouter } from "next/router";

const validationSchema = Yup.object().shape({
  phone: Yup.string().required("Phone Number is required"),
});

export default function PhoneLoginDialog() {
  const [open, setOpen] = useState(false);

  const uiDispatch = useUIDispatch();

  const router = useRouter()

  const { values, errors, setErrors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      phone: "",
    },
    validationSchema,
    async onSubmit(values) {
        console.log(values)
      try {
        const res = await axios.post("/auth/login_with_phone_otp", values);

        const { userId } = res.data.data;

        localStorage.setItem("otpType", "phone_login");
        localStorage.setItem("otpData", userId);

        uiDispatch("SNACKBAR", {
          open: true,
          msg: res.data.message,
          type: "success",
        });

        router.push("/auth/verify_otp");
      } catch (error) {
        if (error.response) {
          uiDispatch("SNACKBAR", {
            open: true,
            msg: error.response.data.message,
            type: "error",
          });

          setErrors(error.response.data.data);
        }
      }
    },
  });
  return (
    <Fragment>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        startIcon={<PhoneIcon />}
        onClick={() => setOpen(true)}
      >
        Phone Login
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogContent>
          <DialogTitle>Login with Phone number</DialogTitle>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <OutlinedInput
                    placeholder="Phone Number"
                    type="tel"
                    value={values.phone}
                    error={Boolean(errors?.phone)}
                    name="phone"
                    onChange={handleChange}
                    startAdornment={
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    }
                  />
                  <Typography color="error">
                    {errors?.phone?.msg || errors?.phone}
                  </Typography>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  color="primary"
                  size="large"
                >
                  Proceed
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
