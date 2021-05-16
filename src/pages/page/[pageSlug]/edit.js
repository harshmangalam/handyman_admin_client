import React, { useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import {
  Box,
  Button,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import { useUIDispatch } from "../../../context/ui";
import useSWR from "swr";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Page title is required"),
  description: Yup.string().required("Page Description is required"),
});

const useStyles = makeStyles((theme) => ({
  editorOutput: {},
}));

function Page({ page }) {
  const classes = useStyles();
  const [ready, setReady] = useState(false);
  const quill = useRef();
  const ReactQuill = quill.current;

  const uiDispatch = useUIDispatch();

  const router = useRouter();

  useEffect(() => {
    quill.current = require("react-quill");
    setReady(true);
  }, []);

  const [value, setValue] = useState(page?.content);

  function handleValue(v) {
    setValue(v);
  }

  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      title: page.title,
      content: page.content,
      description: page.description,
    },
    validationSchema,
    async onSubmit(values) {
      try {
        values = { ...values, content: value };
        const res = await axios.put(`/page/${page._id}`, values);

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
    <Grid container spacing={3} justify="center">
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
              <Box marginTop="16px">
                <ReactQuill
                  modules={modules}
                  formats={formats}
                  theme="snow"
                  value={value}
                  onChange={handleValue}
                ></ReactQuill>
              </Box>
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
              Edit Page
            </Button>
          </form>
        </Paper>
      </Grid>

      {value && (
        <Grid item xs={12} md={6}>
          <Paper style={{ wordWrap: "break-word", padding: "24px" }}>
            <div
              className={classes.editorOutput}
              dangerouslySetInnerHTML={{ __html: value }}
            />
          </Paper>
        </Grid>
      )}
    </Grid>
  );
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
    ["clean"],
    [{ color: [] }, { background: [] }],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "color",
  "background",
];

export const getServerSideProps = async (ctx) => {
  try {
    const res = await axios.get(`/page/${ctx.query.pageSlug}`);
    return {
      props: {
        page: res.data.data.page,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

export default Page;
