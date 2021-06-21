import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import { useState } from "react";
import ImageCard from "../../../components/ImageCard";
import { useUIDispatch } from "../../../context/ui";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import useSWR from "swr";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Service Name is required"),
  description: Yup.string().required("Service Description is required"),
  category: Yup.string().required("Category  is required"),
});

export default function Create({ service }) {
  const [imageData, setImageData] = useState({
    image: service.image,
    imagePublicId: service.imagePublicId,
  });

  const { data: categoryName, error: categoryError } = useSWR(
    "/category/fetch_name"
  );
  const uiDispatch = useUIDispatch();

  const router = useRouter();
  const { setErrors, errors, values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      name: service.name,
      description: service.description,
      price: service.price,
      category: service.category._id,
      currency: service.currency,
    },
    validationSchema,
    async onSubmit(values) {
      try {
        const res = await axios.put(`/service/${service._id}`, {
          ...values,
          ...imageData,
        });
        const data = res.data;

        uiDispatch("SNACKBAR", {
          open: true,
          type: data.type,
          msg: data.message,
        });

        if (data.type === "success") {
          router.push("/service");
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
              label="Service Name"
              name="name"
              onChange={handleChange}
              error={Boolean(errors?.name)}
              value={values.name}
            />
            <Typography variant="body1" color="error">
              {errors?.name}
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
              label="Service Description"
            />
            <Typography variant="body1" color="error">
              {errors?.description}
            </Typography>

            <FormControl
              fullWidth
              variant="outlined"
              error={Boolean(errors?.currency)}
              style={{ marginTop: "16px" }}
            >
              <InputLabel id="currency">Currency</InputLabel>
              <Select
                labelId="currency"
                id="demo-simple-select-outlined"
                value={values.currency}
                onChange={handleChange}
                label="Currency"
                name="currency"
              >
                <MenuItem value="CAD">CAD</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
              </Select>
              <Typography variant="body1" color="error">
                {errors?.currency}
              </Typography>
            </FormControl>
            <TextField
              type="number"
              style={{ marginTop: "16px" }}
              variant="outlined"
              fullWidth
              value={values.price}
              error={Boolean(errors?.price)}
              name="price"
              onChange={handleChange}
              label="Price per hour"
            />
            <Typography variant="body1" color="error">
              {errors?.price}
            </Typography>

            <FormControl
              fullWidth
              variant="outlined"
              error={Boolean(errors?.category)}
              style={{ marginTop: "16px" }}
            >
              <InputLabel id="category">Categories</InputLabel>
              <Select
                labelId="category"
                id="demo-simple-select-outlined"
                value={values.category}
                onChange={handleChange}
                label="Categories"
                name="category"
              >
                {categoryName &&
                  categoryName.data.categories.map((category) => (
                    <MenuItem value={category._id}>{category.name}</MenuItem>
                  ))}
              </Select>
              <Typography variant="body1" color="error">
                {errors?.category}
              </Typography>
            </FormControl>

            <div style={{ marginTop: "16px" }}>
              <ImageCard imageData={imageData} setImageData={setImageData} />
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
    const res = await axios.get(`/service/${ctx.query.serviceId}`);
    return {
      props: {
        service: res.data.data.service,
      },
    };
  } catch (error) {
    console.log(error);
  }
};
