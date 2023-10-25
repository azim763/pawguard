import React from "react";

const DeleteSVG = ({ width, height, fill, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      width={width}
      //   30
      height={height}
      //   30
      fill={fill}
      {...props}
    >
      <path
        d="M24.3396 2.68309L24.1755 2.60951H18.8038V2.06611C18.8038 0.99064 17.9264 0.113281 16.8509 0.113281H12.034C10.9585 0.113281 10.0811 0.99064 10.0811 2.06611V2.60951H5.76226C4.52264 2.53026 3.80377 3.05102 3.42452 3.49253C2.31509 4.78309 2.72264 6.92838 2.77358 7.17177L2.91509 7.8397L3.99056 7.85102L5.82452 29.6321H22.8226L24.6906 8.08875L25.7377 8.10007L25.8736 7.40951C26.6094 3.73026 24.4358 2.72272 24.3396 2.67743V2.68309ZM11.7792 2.06611C11.7792 1.9246 11.8924 1.81139 12.034 1.81139H16.8509C16.9924 1.81139 17.1057 1.9246 17.1057 2.06611V2.60385H11.7792V2.06611ZM5.71132 4.30762H23.7453C23.9547 4.48875 24.3623 4.99819 24.317 6.14724H4.35849C4.33585 5.62083 4.39245 4.95856 4.70943 4.60196C4.77735 4.51706 4.99811 4.27366 5.71132 4.30762ZM21.2604 27.934H7.38113L5.69434 7.868L22.9811 8.07177L21.2604 27.934Z"
        fill="#2B2B2B"
      />
      <path
        d="M11.066 10.4491H9.36792V24.8888H11.066V10.4491Z"
        fill="#2B2B2B"
      />
      <path
        d="M15.1302 10.4491H13.4321V24.8888H15.1302V10.4491Z"
        fill="#2B2B2B"
      />
      <path d="M19.2 10.4491H17.5019V24.8888H19.2V10.4491Z" fill="#2B2B2B" />
    </svg>
  );
};

export default DeleteSVG;