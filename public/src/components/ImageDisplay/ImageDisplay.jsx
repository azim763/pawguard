import React, { useState } from 'react';

function ImageDisplay({ blobUrl }) {
    return (
        <div>
            {blobUrl && <img src={blobUrl} alt="Image" />}
        </div>
    );
}

export default ImageDisplay;
