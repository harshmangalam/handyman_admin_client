import { Button, Grid, TextField, Typography } from "@material-ui/core";
import AuthTemplate from "../../components/Auth/AuthTemplate";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { useUIDispatch } from "../../context/ui";
import { useAuthDispatch } from "../../context/auth";
import * as Yup from "yup";
import Axios from "axios";

const validationSchema = Yup.object().shape({
  phone: Yup.string().required("Phone Number is required"),
});
export default function ResetPassword() {
  const uiDispatch = useUIDispatch();
  const authDispatch = useAuthDispatch();
  const router = useRouter();
  const { values, errors, setErrors, handleChange, handleSubmit } = useFormik({
    validationSchema,
    initialValues: {
      phone: "",
    },
    async onSubmit(values) {
      try {
        const res = await Axios.post("/auth/send_otp", values);

        localStorage.setItem("otpData", JSON.stringify({ ...res.data.data }));
        uiDispatch("SNACKBAR", {
          open: true,
          msg: res.data.message,
          type: res.data.type,
        });
        router.push("/auth/verify_otp");
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
    <AuthTemplate back="/auth/login" title="Send OTP">
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              type="tel"
              label="Phone Number"
              value={values.phone}
              variant="outlined"
              onChange={handleChange}
              fullWidth
              name="phone"
              error={Boolean(errors?.phone)}
            />
            <Typography color="error">{errors?.phone}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Send OTP
            </Button>
          </Grid>
        </Grid>
      </form>
    </AuthTemplate>
  );
}
