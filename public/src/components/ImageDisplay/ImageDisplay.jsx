import React, { useState } from 'react';

function ImageDisplay({ PetImageData }) {
    return (
        <div>
            <img src={`data:image/jpeg;base64,${PetImageData}`} alt="Uploaded" />
        </div>
    );
}

export default ImageDisplay;
