import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Button,
  Typography,
} from "@material-ui/core";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import UserIcon from "@material-ui/icons/AccountBox";
import PasswordIcon from "@material-ui/icons/Lock";

import Link from "next/link";
import { useState } from "react";
import AuthTemplate from "../../components/Auth/AuthTemplate";

import { useFormik } from "formik";

import axios from "axios";
import { useUIDispatch } from "../../context/ui";

import * as Yup from "yup";
import { useAuthDispatch } from "../../context/auth";
import { useRouter } from "next/router";
import PhoneLoginDialog from "../../components/Auth/PhoneLoginModal";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Email/Phone must be required"),
  password: Yup.string().required("Password must be required"),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const uiDispatch = useUIDispatch();
  const router = useRouter();
  const authDispatch = useAuthDispatch();
  const { setErrors, errors, values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,

    async onSubmit(values) {
      try {
        localStorage.removeItem("otpType");
        localStorage.removeItem("otpData");

        const res = await axios.post("/auth/login_with_username", values);
        const { user } = res.data.data;

        uiDispatch("SNACKBAR", {
          open: true,
          msg: res.data.message,
          type: "success",
        });

        if (!user.isAccountVerified) {
          router.push("/auth/send_otp");
          return;
        }
        authDispatch("LOGIN", user);

        router.push("/");
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
    <AuthTemplate back="/" title="Login">
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <OutlinedInput
                placeholder="Email or Phone"
                type="text"
                value={values.username}
                error={Boolean(errors?.username)}
                name="username"
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">
                    <UserIcon />
                  </InputAdornment>
                }
              />
              <Typography color="error">
                {errors?.username?.msg || errors?.username}
              </Typography>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <OutlinedInput
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange}
                name="password"
                error={Boolean(errors?.password)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                startAdornment={
                  <InputAdornment position="start">
                    <PasswordIcon />
                  </InputAdornment>
                }
              />
              <Typography color="error">
                {errors?.password?.msg || errors?.password}
              </Typography>
            </FormControl>
          </Grid>

          <Grid xs={12} item>
            <Link href="/auth/send_otp" passHref>
              <a
                style={{ textDecoration: "none" }}
                onClick={() =>
                  localStorage.setItem("otpType", "reset_password")
                }
              >
                <span style={{ color: "whitesmoke" }}> Forgot Password ?</span>
              </a>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={handleSubmit}
              size="large"
              fullWidth
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </Grid>

          <Grid item xs={12}>
            <PhoneLoginDialog />
          </Grid>
        </Grid>
      </form>
    </AuthTemplate>
  );
}
