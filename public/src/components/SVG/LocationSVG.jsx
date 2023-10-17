import React from "react";

const LocationSVG = ({ width, height, fill, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 23 34"
      width={width}
      //   23
      height={height}
      //   34
      fill={fill}
      {...props}
    >
      <path
        d="M11.7418 33.7673C11.5253 34.0494 11.112 34.0822 10.8562 33.8263L10.5348 33.5049C7.28758 30.2643 3.36473 22.6482 1.82314 19.5256C1.28522 18.4301 0.898188 17.3871 0.64235 16.3441C-1.85699 6.22207 3.50905 2.27954 6.93334 0.829795C8.99972 -0.049238 11.3679 -0.239477 13.6048 0.304999C17.0553 1.13811 19.5284 2.90274 20.9651 5.5464C23.7924 10.7484 21.4964 17.433 21.398 17.7151C19.6728 23.2845 12.3256 32.9998 12.0173 33.4065L11.7418 33.7673ZM11.0464 1.97123C9.89188 1.97123 8.74389 2.19426 7.70085 2.64034C4.22408 4.11633 0.511151 7.60622 2.5513 15.8783C2.77433 16.7836 3.11545 17.6889 3.58777 18.6597C4.88008 21.2837 7.89765 27.1614 10.6528 30.6644C10.8955 30.9728 11.3679 30.9662 11.5975 30.6513C13.7557 27.66 18.2886 21.0935 19.5284 17.0985C19.5612 17.0001 21.6407 10.9059 19.2332 6.47791C18.0721 4.35249 16.0254 2.91586 13.1456 2.2205C12.4568 2.05651 11.7483 1.97123 11.0464 1.97123Z"
        fill="#2B2B2B"
      />
      <path
        d="M11.1843 17.1312C8.21261 17.1312 5.79199 14.7106 5.79199 11.739C5.79199 8.7673 8.21261 6.34668 11.1843 6.34668C14.1559 6.34668 16.5765 8.7673 16.5765 11.739C16.5765 14.7106 14.1559 17.1312 11.1843 17.1312ZM11.1843 8.31466C9.295 8.31466 7.75998 9.84969 7.75998 11.739C7.75998 13.6282 9.295 15.1632 11.1843 15.1632C13.0735 15.1632 14.6086 13.6282 14.6086 11.739C14.6086 9.84969 13.0735 8.31466 11.1843 8.31466Z"
        fill="#2B2B2B"
      />
    </svg>
  );
};

export default LocationSVG;
