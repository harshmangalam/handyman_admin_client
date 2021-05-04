import {
  Button,
  colors,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import { useState } from "react";
import ImageCard from "../../components/ImageCard";
import { useUIDispatch } from "../../context/ui";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Category Name is required"),
  description: Yup.string().required("Category Description is required"),
});

const initialValues = {
  name: "",
  description: "",
};

export default function Create() {
  const [image, setImage] = useState();

  const uiDispatch = useUIDispatch();

  const router = useRouter();
  const { setErrors, errors, values, handleSubmit, handleChange } = useFormik({
    initialValues,
    validationSchema,
    async onSubmit(values) {
      try {
        const res = await axios.post("/category", values);
        const data = res.data;

        uiDispatch("SNACKBAR", {
          open: true,
          type: data.type,
          msg: data.message,
        });

        if (data.type === "success") {
          router.push("/category");
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
              label="Category Name"
              name="name"
              onChange={handleChange}
              error={Boolean(errors?.name)}
              value={values.name}
            />
            <Typography variant="body1" color="error">
              {errors?.name?.msg || errors?.name}
            </Typography>
            <TextField
              style={{ marginTop: "16px" }}
              variant="outlined"
              fullWidth
              multiline
              rows={10}
              value={values.description}
              error={Boolean(errors?.description)}
              name="description"
              onChange={handleChange}
              label="Category Description"
            />
            <Typography variant="body1" color="error">
              {errors?.description?.msg || errors?.description}
            </Typography>

            <div style={{ marginTop: "16px" }}>
              <ImageCard image={image} setImage={setImage} />
            </div>

            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              color="secondary"
              style={{ marginTop: "24px" }}
            >
              Create Category
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
