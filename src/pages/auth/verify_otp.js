import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import AuthTemplate from "../../components/Auth/AuthTemplate";

import Link from "next/link";

import { useFormik } from "formik";
import { useAuthDispatch, useAuthState } from "../../context/auth";
import { useRouter } from "next/router";

import axios from "axios";

import * as Yup from "yup";
import { useUIDispatch } from "../../context/ui";

const validationSchema = Yup.object().shape({
  otp: Yup.string().required("OTP is requied"),
});

export default function VerifyOtp() {
  const uiDispatch = useUIDispatch();
  const authDispatch = useAuthDispatch();
  const router = useRouter();
  const { values, errors, setErrors, handleChange, handleSubmit } = useFormik({
    validationSchema,
    initialValues: {
      otp: "",
      userId: "",
    },
    async onSubmit(values) {
      try {
        const userId = localStorage.getItem("otpData");
        const otpType = localStorage.getItem("otpType");

        values.userId = userId;

        if (!userId) {
          uiDispatch("SNACKBAR", {
            open: true,
            msg: "Resend otp",
            type: "error",
          });
          router.push("/auth/send_otp");
          return;
        }

        if (otpType === "phone_login") {
          const res = await axios.post(
            "/auth/login_with_phone_otp/verify",
            values
          );

          const { user } = res.data.data;

          uiDispatch("SNACKBAR", {
            open: true,
            msg: res.data.message,
            type: res.data.type,
          });

          authDispatch("LOGIN", {
            token,
            user,
          });

          localStorage.removeItem("otpType");
          localStorage.removeItem("otpData");

          router.push("/");
          return;
        }

        const res = await axios.post("/auth/verify_otp", values);

        uiDispatch("SNACKBAR", {
          open: true,
          msg: res.data.message,
          type: res.data.type,
        });

        if (otpType === "reset_password") {
          router.push("/auth/reset_password");
          return;
        }

        if (otpType === "verify_account") {
          router.push("/auth/login");
          return;
        }
      } catch (error) {
        if (error.response) {
          uiDispatch("SNACKBAR", {
            open: true,
            msg: error.response.data.message,
            type: "error",
          });
        }
      }
    },
  });
  return (
    <AuthTemplate back="/" title="Verify OTP">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type="number"
              value={values.otp}
              label="OTP"
              variant="outlined"
              onChange={handleChange}
              fullWidth
              error={Boolean(errors?.otp)}
              name="otp"
            />
            <Typography color="error">{errors?.otp}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Proceed
            </Button>
          </Grid>
        </Grid>
      </form>

      <Box py={3} fontSize="20px" textAlign="center">
        <Link href="/auth/send_otp" passHref>
          <a style={{textDecoration:"none",color:"wheat"}}>
          resend otp 
          </a>
        </Link>
      </Box>
    </AuthTemplate>
  );
}
