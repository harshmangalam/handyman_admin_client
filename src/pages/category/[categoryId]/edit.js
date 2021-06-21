import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import { useState } from "react";
import ImageCard from "../../../components/ImageCard";
import { useUIDispatch } from "../../../context/ui";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Category Name is required"),
  description: Yup.string().required("Category Description is required"),
});

export default function Edit({ category }) {
  const [imageData, setImageData] = useState();

  const uiDispatch = useUIDispatch();

  const router = useRouter();
  const { setErrors, errors, values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      name: category.name,
      description: category.description,
    },
    validationSchema,
    async onSubmit(values) {
      try {
        const res = await axios.put(`/category/${category._id}`, { ...values, ...imageData });
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
            <ImageCard setImageData={setImageData} />
            </div>

            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              color="secondary"
              style={{ marginTop: "24px" }}
            >
              Edit Category
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export const getServerSideProps = async (ctx) => {
  try {
    const res = await axios.get(`/category/${ctx.query.categoryId}`);
    return {
      props: {
        category: res.data.data.category,
      },
    };
  } catch (error) {
    console.log(error);
  }
};
