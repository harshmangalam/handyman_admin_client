import { Button, Grid, TextField, Typography } from "@material-ui/core";
import AuthTemplate from "../../components/Auth/AuthTemplate";

import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useUIDispatch } from "../../context/ui";

import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object().shape({
  newPassword: Yup.string().required("Password is required"),
});
export default function ChangePassword() {
  let otpData;
  if (typeof window !== "undefined") {
    otpData =
      localStorage.otpData && JSON.parse(localStorage.getItem("otpData"));
  }
  const router = useRouter();

  const uiDispatch = useUIDispatch();

  const { values, errors, setErrors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      newPassword: "",
      userId: otpData?.userId,
    },
    validationSchema,
    async onSubmit(values) {
      try {
        const res = await axios.post("/auth/reset_password", values);
        uiDispatch("SNACKBAR", {
          open: true,
          msg: res.data.message,
          type: res.data.type,
        });
        localStorage.removeItem("otpData");
        localStorage.removeItem("otpType");
        router.push("/auth/login");
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
    <AuthTemplate back="/auth/login" title="Reset Password">
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type="password"
              value={values.newPassword}
              label="New Password"
              variant="outlined"
              onChange={handleChange}
              error={Boolean(errors?.newPassword)}
              fullWidth
              name="newPassword"
            />
            <Typography color="error">{errors?.newPassword}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Change Password
            </Button>
          </Grid>
        </Grid>
      </form>
    </AuthTemplate>
  );
}
