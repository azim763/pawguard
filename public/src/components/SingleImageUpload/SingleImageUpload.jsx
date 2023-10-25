import React, { useState } from 'react';

function SingleImageUpload({onChange}) {
  const [selectedImage, setSelectedImage] = useState(null);



  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
      />
      {selectedImage && (
        <div>
          <h3>Selected Image Preview</h3>
          <img src={selectedImage} alt="Selected" width="200" height="200" />
        </div>
      )}
    </div>
  );
}

export default SingleImageUpload;
