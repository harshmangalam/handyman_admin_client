import { useState } from "react";
import axios from "axios";

const cloudinaryURL =
  "https://api.cloudinary.com/v1_1/officialharsh/image/upload";

const useCloudinary = (setImageData) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function uploadImage(e) {
    try {
      const data = new FormData();
      data.append("file", e.target.files[0]);
      data.append("upload_preset", "handyman");
      setLoading(true);
      axios.defaults.withCredentials = false;

      const res = await axios.post(cloudinaryURL, data);
      setData(res.data);
      setImageData({
        image: res.data.secure_url,
        imagePublicId: res.data.public_id,
      });
    } catch (error) {
      console.log(error);
    } finally {
      axios.defaults.withCredentials = true;
      setLoading(false);
    }
  }

  async function removeImage() {
    try {
      setImageData(null);
      setData(null);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    data,
    loading,
    uploadImage,
    removeImage,
  };
};

export default useCloudinary;
