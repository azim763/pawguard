import React from "react";

const MarkerSVG = ({ width, height, fill, ...props }) => {
  return (
    <svg
      xmlns="https://www.w3.org/2000/svg"
      viewBox="0 0 24 34"
      width={width}
      //   24
      height={height}
      //   34
      fill={fill}
      {...props}
    >
      <path d="M11.9773 0C5.35555 0 0 5.321 0 11.9C0 20.825 11.9773 34 11.9773 34C11.9773 34 23.9545 20.825 23.9545 11.9C23.9545 5.321 18.599 0 11.9773 0ZM11.9773 16.15C9.61604 16.15 7.69967 14.246 7.69967 11.9C7.69967 9.554 9.61604 7.65 11.9773 7.65C14.3385 7.65 16.2549 9.554 16.2549 11.9C16.2549 14.246 14.3385 16.15 11.9773 16.15Z" fill="var(--salmon-pink)"/>
    </svg>
  );
};

export default MarkerSVG;
