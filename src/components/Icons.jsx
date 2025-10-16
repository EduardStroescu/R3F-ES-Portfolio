import PropTypes from "prop-types";

export function AudioIcon({ className }) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      viewBox="0 0 56 56"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="bars-mask">
        {/* White = visible, black = transparent */}
        <rect x="0" y="0" width="56" height="56" fill="white" />
        <g fill="black">
          <rect
            className="bar b1"
            x="14"
            y="12"
            width="3"
            height="32"
            rx="1.5"
          />
          <rect
            className="bar b2"
            x="19"
            y="15"
            width="3"
            height="27"
            rx="1.5"
          />
          <rect
            className="bar b3"
            x="24"
            y="18"
            width="3"
            height="22"
            rx="1.5"
          />
          <rect
            className="bar b4"
            x="29.5"
            y="21"
            width="3"
            height="17"
            rx="1.5"
          />
          <rect
            className="bar b5"
            x="35"
            y="24"
            width="3"
            height="12"
            rx="1.5"
          />
          <rect
            className="bar b6"
            x="40.5"
            y="26"
            width="3"
            height="8"
            rx="1.5"
          />
        </g>
      </mask>

      <circle cx="28" cy="28" r="26" strokeWidth="2" mask="url(#bars-mask)" />
    </svg>
  );
}

export function SuccessIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width="25.903"
      height="22.395"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fill="#f597e8"
          fillRule="evenodd"
          d="M3 10a7 7 0 019.307-6.611 1 1 0 00.658-1.889 9 9 0 105.98 7.501 1 1 0 00-1.988.22A7 7 0 113 10zm14.75-5.338a1 1 0 00-1.5-1.324l-6.435 7.28-3.183-2.593a1 1 0 00-1.264 1.55l3.929 3.2a1 1 0 001.38-.113l7.072-8z"
        ></path>
      </g>
    </svg>
  );
}

export function FailIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width="25.903"
      height="22.395"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fill="#F87171"
          fillRule="evenodd"
          d="M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0zm12.844-3.707a1 1 0 010 1.414l-2.361 2.362 2.361 2.36a1 1 0 01-1.414 1.415l-2.361-2.361-2.362 2.361a1 1 0 11-1.414-1.414l2.361-2.361-2.361-2.362a1 1 0 011.414-1.414l2.362 2.361 2.36-2.361a1 1 0 011.415 0z"
        ></path>
      </g>
    </svg>
  );
}

export function ScrollIcon() {
  return (
    <svg
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="34"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M5 15C5 16.8565 5.73754 18.6371 7.05029 19.9498C8.36305 21.2626 10.1435 21.9999 12 21.9999C13.8565 21.9999 15.637 21.2626 16.9498 19.9498C18.2625 18.6371 19 16.8565 19 15V9C19 7.14348 18.2625 5.36305 16.9498 4.05029C15.637 2.73754 13.8565 2 12 2C10.1435 2 8.36305 2.73754 7.05029 4.05029C5.73754 5.36305 5 7.14348 5 9V15Z"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <g className="animate-bounce-custom">
          <path
            d="M12 6V14"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M15 11L12 14L9 11"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </g>
      </g>
    </svg>
  );
}

export function HyperlinkIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z" />
    </svg>
  );
}

export function GithubIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="black"
        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
      />
    </svg>
  );
}

export function LinkedInIcon({ className }) {
  return (
    <svg
      className={className}
      fill="#000000"
      height="24"
      width="24"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="-143 145 512 512"
      xmlSpace="preserve"
    >
      <path
        d="M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M41.4,508.1H-8.5V348.4h49.9
   V508.1z M15.1,328.4h-0.4c-18.1,0-29.8-12.2-29.8-27.7c0-15.8,12.1-27.7,30.5-27.7c18.4,0,29.7,11.9,30.1,27.7
   C45.6,316.1,33.9,328.4,15.1,328.4z M241,508.1h-56.6v-82.6c0-21.6-8.8-36.4-28.3-36.4c-14.9,0-23.2,10-27,19.6
   c-1.4,3.4-1.2,8.2-1.2,13.1v86.3H71.8c0,0,0.7-146.4,0-159.7h56.1v25.1c3.3-11,21.2-26.6,49.8-26.6c35.5,0,63.3,23,63.3,72.4V508.1z
   "
      />
    </svg>
  );
}

export function EmailIcon({ className }) {
  return (
    <svg
      className={className}
      width="25"
      height="25"
      viewBox="2 2 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#000000"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM7.005 9C7.005 8.45 7.45 8 8 8H16C16.55 8 17 8.45 17 9V15C17 15.55 16.55 16 16 16H8C7.45 16 7 15.55 7 15L7.005 9ZM12 12.5L8.00001 9.99997V15H16V9.99997L12 12.5ZM12 11.5L8.00001 9.00001H16L12 11.5Z"
      />
    </svg>
  );
}

AudioIcon.propTypes = {
  className: PropTypes.string,
};

HyperlinkIcon.propTypes = {
  className: PropTypes.string,
};

GithubIcon.propTypes = {
  className: PropTypes.string,
};

EmailIcon.propTypes = {
  className: PropTypes.string,
};

LinkedInIcon.propTypes = {
  className: PropTypes.string,
};
