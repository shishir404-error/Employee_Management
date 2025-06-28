// src/utils/cloudinaryUpload.js
export const uploadImageToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "assets_management"); // ✅ Your unsigned preset name
  data.append("cloud_name", "dkgeizmxz");             // ✅ Your cloud name

  try {
    const res = await fetch("https://api.cloudinary.com/v1_1/dkgeizmxz/image/upload", {
      method: "POST",
      body: data,
    });

    const json = await res.json();
    return json.secure_url;
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    return null;
  }
};
