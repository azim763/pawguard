import React, { useState } from 'react';

function SingleImageUpload({ handleImageChange }) {
  const [image, setImage] = useState(null);

  return (
    <div>
      <h2>Single Image Upload</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      {image && (
        <div>
          <h3>Selected Image Preview</h3>
          <img src={image} alt="Selected" width="200" height="200" />
        </div>
      )}
    </div>
  );
}

export default SingleImageUpload;
