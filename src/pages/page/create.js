import React, { useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import { useUIDispatch } from "../../context/ui";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Page title is required"),
  description: Yup.string().required("Page Description is required"),
});

const initialValues = {
  title: "",
  description: "",
  content: "",
};

function Page(props) {
  const [ready, setReady] = useState(false);
  const quill = useRef();
  const ReactQuill = quill.current;

  const uiDispatch = useUIDispatch();

  useEffect(() => {
    quill.current = require("react-quill");
    setReady(true);
  }, []);
  const [value, setValue] = useState("");

  const router = useRouter();

  function handleValue(v) {
    setValue(v);
  }

  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues,
    validationSchema,
    async onSubmit(values) {
      try {
        values = { ...values, content: value };
        const res = await axios.post("/page", values);

        uiDispatch("SNACKBAR", {
          open: true,
          type: res.data.type,
          msg: res.data.message,
        });
        if (res.data.type === "success") {
          router.push("/page");
        }
      } catch (error) {
        uiDispatch("SNACKBAR", {
          open: true,
          type: error.response.data.type,
          msg: error.response.data.message,
        });
      }
    },
  });
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper style={{ padding: "16px" }}>
          <form onSubmit={handleSubmit}>
            <TextField
              style={{ marginTop: "16px" }}
              variant="outlined"
              fullWidth
              label="Page Title"
              name="title"
              onChange={handleChange}
              error={Boolean(errors?.title)}
              value={values.title}
            />
            <Typography variant="body1" color="error">
              {errors?.title}
            </Typography>
            <TextField
              style={{ marginTop: "16px" }}
              variant="outlined"
              fullWidth
              multiline
              rows={5}
              value={values.description}
              error={Boolean(errors?.description)}
              name="description"
              onChange={handleChange}
              label="Page Description"
            />
            <Typography variant="body1" color="error">
              {errors?.description}
            </Typography>

            {ready ? (
              <ReactQuill theme="snow" value={value} onChange={handleValue} />
            ) : (
              <p>Loading...</p>
            )}

            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              color="secondary"
              style={{ marginTop: "24px" }}
            >
              Create Page
            </Button>
          </form>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper style={{ wordWrap: "break-word", padding: "24px" }}>
          <div dangerouslySetInnerHTML={{ __html: value }} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Page;
