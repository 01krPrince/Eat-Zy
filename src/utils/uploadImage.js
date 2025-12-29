/**
 * Uploads an image/file to Cloudinary.
 * * @param {File} file - The file object from the input e.target.files[0]
 * @param {String} folderName - (Optional) The specific folder to store the image in. 
 * Defaults to your main folder if not provided.
 */
export const uploadToCloudinary = async (file, folderName) => {
  // 1. Credentials from your screenshots
  const cloudName = "cloudinarycloudstore"; //
  const uploadPreset = "ml_default";        //

  // 2. Prepare the form data
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  // 3. Dynamic Folder Logic
  // Note: For this to work with Unsigned uploads, your "ml_default" preset 
  // must NOT have a hardcoded folder locked in its settings.
  if (folderName) {
    formData.append("folder", folderName);
  }

  // 4. Send to Cloudinary API
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message || "Upload failed");
    }

    const data = await response.json();
    return data.secure_url; // Returns the HTTPS link to the image

  } catch (error) {
    console.error("Error uploading image:", error);
    alert("Image upload failed: " + error.message);
    return null;
  }
};