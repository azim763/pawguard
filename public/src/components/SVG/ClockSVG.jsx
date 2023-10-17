import React from "react";

const ClockSVG = ({ width, height, fill, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      //   26
      height={height}
      //   27
      fill={fill}
      {...props}
    >
      <g clip-path="url(#clip0_1513_12607)">
        <path
          d="M12.9607 26.5C5.81186 26.5 0 20.6724 0 13.5C0 6.32759 5.81186 0.5 12.9607 0.5C20.1095 0.5 25.9214 6.33545 25.9214 13.5C25.9214 20.6645 20.1095 26.5 12.9607 26.5ZM12.9607 2.0729C6.67695 2.0729 1.5729 7.20054 1.5729 13.5C1.5729 19.7995 6.68482 24.9271 12.9607 24.9271C19.2365 24.9271 24.3485 19.7995 24.3485 13.5C24.3485 7.20054 19.2444 2.0729 12.9607 2.0729Z"
          fill="#2B2B2B"
        />
        <path
          d="M19.0793 18.8634C18.9142 18.8634 18.749 18.8162 18.6075 18.7061L12.4889 14.1289C12.2923 13.9795 12.1743 13.7436 12.1743 13.4998V6.93293C12.1743 6.50039 12.5282 6.14648 12.9608 6.14648C13.3933 6.14648 13.7472 6.50039 13.7472 6.93293V13.1066L19.5512 17.4478C19.8972 17.7073 19.968 18.2027 19.7085 18.5488C19.5512 18.7533 19.3153 18.8634 19.0793 18.8634Z"
          fill="#2B2B2B"
        />
      </g>
      <defs>
        <clipPath id="clip0_1513_12607">
          <rect
            width="25.9214"
            height="26"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ClockSVG;
