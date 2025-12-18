export const uploadToCloudinary = async (file: File): Promise<string> => {
  console.log(
  import.meta.env.VITE_CLOUDINARY_NAME,
  import.meta.env.VITE_CLOUDINARY_PRESET
);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error?.message || 'Image upload failed');
  }

  return data.secure_url;
};
