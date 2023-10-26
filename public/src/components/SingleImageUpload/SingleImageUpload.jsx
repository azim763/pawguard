import React, { useState } from 'react';

function SingleImageUpload({ onImageUpload }) {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(URL.createObjectURL(file));

        // Emit the image data to the parent component
        onImageUpload(reader.result.split(',')[1]); // Pass the base64 data as a string

      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);

      // Notify the parent component that no image is selected
      onImageUpload(null);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
    </div>
  );
}

export default SingleImageUpload;
