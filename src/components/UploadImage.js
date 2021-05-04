import { Avatar, Button, Chip } from "@material-ui/core";
import {
  Delete as DeleteIcon,
  CloudUploadOutlined as UploadIcon,
} from "@material-ui/icons";
export default function UploadImage({ image, setImage }) {
  return (
    <div style={{ marginTop: "20px" }}>
      {image ? (
        <>
          <Avatar
            variant="square"
            style={{ width: "100%", height: "200px" }}
            src={URL.createObjectURL(image)}
          />
          <Chip
            label={`${image.name} (${Math.floor(image.size / 1000)}) KB`}
            onDelete={() => setImage(null)}
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
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label htmlFor="contained-button-file">
            <Button
              startIcon={<UploadIcon />}
              variant="contained"
              color="primary"
              component="span"
            >
              Upload Image
            </Button>
          </label>
        </>
      )}
    </div>
  );
}
