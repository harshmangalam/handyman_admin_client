import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import { useUIDispatch } from "../../context/ui";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
const validationSchema = Yup.object().shape({
  city: Yup.string().required(" City  Name is required"),
  country: Yup.string().required(" Country Name is required"),
});

const initialValues = {
  city: "",
  country: "",
};

export default function Create() {
  const uiDispatch = useUIDispatch();

  const router = useRouter();
  const { setErrors, errors, values, handleSubmit, handleChange } = useFormik({
    initialValues,
    validationSchema,
    async onSubmit(values) {
      try {
        const res = await axios.post("/region", values);
        const data = res.data;

        uiDispatch("SNACKBAR", {
          open: true,
          type: data.type,
          msg: data.message,
        });

        if (data.type === "success") {
          router.push("/region");
        }
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
    <Grid container alignItems="center" justify="center">
      <Grid item xs={12} sm={6}>
        <Paper style={{ padding: "16px" }}>
          <form onSubmit={handleSubmit}>
            <TextField
              style={{ marginTop: "16px" }}
              variant="outlined"
              fullWidth
              label="City Name"
              name="city"
              onChange={handleChange}
              error={Boolean(errors?.city)}
              value={values.city}
            />
            <Typography variant="body1" color="error">
              {errors?.city}
            </Typography>
            <TextField
              style={{ marginTop: "16px" }}
              variant="outlined"
              fullWidth
              value={values.country}
              error={Boolean(errors?.country)}
              name="country"
              onChange={handleChange}
              label="Country"
            />
            <Typography variant="body1" color="error">
              {errors?.country}
            </Typography>

            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              color="secondary"
              style={{ marginTop: "24px" }}
            >
              Add Region
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
