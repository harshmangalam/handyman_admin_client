import { Avatar, Button, Chip, CircularProgress } from "@material-ui/core";
import { CloudUploadOutlined as UploadIcon } from "@material-ui/icons";

import useCloudinary from "../hooks/useCloudinary";

export default function ImageCard({ imageData, setImageData }) {
  const { loading, uploadImage, removeImage, data } =
    useCloudinary(setImageData);

  return (
    <div style={{ marginTop: "20px" }}>
      {data || imageData ? (
        <>
          <Avatar
            variant="square"
            style={{ width: "100%", height: "200px" }}
            src={data?.secure_url || imageData?.image}
          />
          <Chip
            label="Remove"
            onDelete={removeImage}
            color="secondary"
            style={{ position: "relative", top: "-20px", left: "40%" }}
          />
        </>
      ) : (
        <>
          <input
            accept="image/*"
            id="contained-button-file"
            type="file"
            hidden
            onChange={uploadImage}
          />
          <label htmlFor="contained-button-file">
            <Button
              startIcon={loading ? <CircularProgress /> : <UploadIcon />}
              variant="contained"
              color="primary"
              component="span"
              disabled={loading}
            >
              Upload Image
            </Button>
          </label>
        </>
      )}
    </div>
  );
}
