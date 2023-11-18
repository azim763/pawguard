import React from "react";

const UserSVG = ({ width, height, fill, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={width}
      //   48
      height={height}
      //   48
      fill={fill}
      {...props}
    >
      <g clipPath="url(#clip0_2166_13088)" filter="url(#filter0_d_2166_13088)">
        <path
          d="M24.3327 17.3092C27.0367 17.3092 29.2287 15.1171 29.2287 12.4131C29.2287 9.70912 27.0367 7.51709 24.3327 7.51709C21.6287 7.51709 19.4366 9.70912 19.4366 12.4131C19.4366 15.1171 21.6287 17.3092 24.3327 17.3092Z"
          fill="#FDFAF5"
        />
        <path
          d="M32.8412 29.2886C33.0031 28.6075 33.093 27.8994 33.093 27.1688C33.093 22.1492 29.0219 18.0781 24.0023 18.0781C18.9826 18.0781 14.9116 22.1492 14.9116 27.1688C14.9116 27.8994 14.9992 28.6075 15.1633 29.2886H32.8434H32.8412Z"
          fill="#FDFAF5"
        />
        <mask
          id="mask0_2166_13088"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="4"
          y="0"
          width="40"
          height="40"
        >
          <path d="M44 0H4V40H44V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_2166_13088)">
          <mask
            id="mask1_2166_13088"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="4"
            y="0"
            width="41"
            height="40"
          >
            <path d="M44.2181 0H4.21808V40H44.2181V0Z" fill="white" />
          </mask>
          <g mask="url(#mask1_2166_13088)">
            <path
              d="M24.2181 39.4179C13.5088 39.4179 4.80029 30.7093 4.80029 20.0001C4.80029 9.29088 13.5088 0.580078 24.2181 0.580078C34.9273 0.580078 43.6359 9.28863 43.6359 19.9979C43.6359 30.7071 34.9273 39.4156 24.2181 39.4156V39.4179ZM24.2181 2.84601C14.761 2.84601 7.06173 10.543 7.06173 20.0001C7.06173 29.4572 14.7587 37.1542 24.2158 37.1542C33.6729 37.1542 41.3699 29.4572 41.3699 20.0001C41.3699 10.543 33.6729 2.84601 24.2181 2.84601Z"
              fill="#FDFAF5"
            />
            <path
              d="M32.3377 20.3016C31.0406 18.7617 29.3726 17.6602 27.5068 17.0555C28.7747 16.1339 29.6581 14.6929 29.802 13.0092C30.0672 9.92953 27.7788 7.21401 24.6991 6.94875C23.2132 6.82062 21.7566 7.28145 20.6169 8.24582C19.4704 9.21244 18.7758 10.5635 18.6477 12.0493C18.4746 14.0725 19.403 15.9293 20.9338 17.0465C19.6592 17.4624 18.4498 18.1256 17.3933 19.0157C15.2263 20.8411 13.9 23.4015 13.6572 26.2227C13.6055 26.7959 13.6055 27.3781 13.6505 27.9423C13.7719 29.4754 15.0622 30.6826 16.5863 30.6826H31.8701C33.3717 30.6826 34.6553 29.5361 34.7902 28.0795V28.0345C35.0397 25.2111 34.163 22.4641 32.3444 20.2993H32.3377V20.3016ZM20.6236 12.2179C20.7068 11.2603 21.1586 10.3926 21.8915 9.76543C22.5479 9.21468 23.3639 8.9202 24.2091 8.9202C24.3147 8.9202 24.4204 8.9202 24.526 8.93594C26.5042 9.10903 27.9834 10.8534 27.8081 12.8384C27.635 14.8166 25.8838 16.2732 23.9056 16.1204C21.9274 15.9473 20.4483 14.2029 20.6236 12.2179ZM32.7963 27.8772C32.7513 28.329 32.3444 28.6842 31.8611 28.6842H16.5796C16.0738 28.6842 15.6669 28.2998 15.6287 27.785C15.5905 27.3242 15.5994 26.8566 15.6354 26.3958C15.831 24.1006 16.91 22.0257 18.6701 20.5399C20.2392 19.2181 22.1792 18.5167 24.2023 18.5167C24.4519 18.5167 24.7014 18.5234 24.9577 18.5459C27.2528 18.7415 29.3277 19.8205 30.8136 21.5807C32.2927 23.3385 33.0031 25.573 32.8052 27.8682L32.7985 27.8749L32.7963 27.8772Z"
              fill="#FDFAF5"
            />
          </g>
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_2166_13088"
          x="0"
          y="0"
          width="48"
          height="48"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2166_13088"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2166_13088"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_2166_13088">
          <rect width="40" height="40" fill="white" transform="translate(4)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default UserSVG;
