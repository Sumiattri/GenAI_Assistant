const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={32}
    height={32}
    style={{
      width: "100%",
      height: "100%",
      transform: "translate3d(0,0,0)",
      contentVisibility: "visible",
    }}
    {...props}
  >
    <defs>
      <linearGradient
        id="a"
        x1={-33}
        x2={31}
        y1={26}
        y2={-28}
        gradientUnits="userSpaceOnUse"
        spreadMethod="pad"
      >
        <stop offset="0%" stopColor="#346BF1" />
        <stop offset="22%" stopColor="#3279F8" />
        <stop offset="45%" stopColor="#3186FF" />
        <stop offset="72%" stopColor="#4093FF" />
        <stop offset="99%" stopColor="#4FA0FF" />
      </linearGradient>
      <linearGradient
        id="e"
        x1={-33}
        x2={31}
        y1={26}
        y2={-28}
        gradientUnits="userSpaceOnUse"
        spreadMethod="pad"
      >
        <stop offset="0%" stopColor="#346BF1" />
        <stop offset="22%" stopColor="#3279F8" />
        <stop offset="45%" stopColor="#3186FF" />
        <stop offset="72%" stopColor="#4093FF" />
        <stop offset="99%" stopColor="#4FA0FF" />
      </linearGradient>
      <clipPath id="c">
        <path d="M0 0h32v32H0z" />
      </clipPath>
      <path
        id="b"
        fill="url(#a)"
        d="M-3.9-84.95c-1.38 5.48-3.18 10.81-5.42 16.02-5.84 13.56-13.84 25.43-24.01 35.6-10.17 10.16-22.04 18.17-35.6 24.01A105.59 105.59 0 0 1-84.95-3.9 4.022 4.022 0 0 0-88 0c0 1.85 1.26 3.45 3.05 3.9 5.48 1.38 10.81 3.18 16.02 5.42 13.56 5.84 25.42 13.84 35.6 24.01 10.17 10.17 18.18 22.04 24.01 35.6 2.24 5.2 4.04 10.54 5.42 16.02A4.03 4.03 0 0 0 0 88c1.85 0 3.45-1.26 3.9-3.05 1.38-5.48 3.18-10.81 5.42-16.02 5.84-13.56 13.84-25.42 24.01-35.6C43.5 23.16 55.37 15.15 68.93 9.32c5.2-2.24 10.54-4.04 16.02-5.42A4.03 4.03 0 0 0 88 0c0-1.85-1.26-3.45-3.05-3.9-5.48-1.38-10.81-3.18-16.02-5.42-13.56-5.84-25.42-13.84-35.6-24.01C23.16-43.5 15.15-55.37 9.32-68.93A105.59 105.59 0 0 1 3.9-84.95 4.022 4.022 0 0 0 0-88c-1.85 0-3.45 1.26-3.9 3.05z"
        style={{
          display: "block",
        }}
        transform="matrix(.1248 0 0 .1248 16 16)"
      />
      <mask id="d" mask-type="alpha">
        <use xlinkHref="#b" />
      </mask>
    </defs>
    <g
      clipPath="url(#c)"
      mask="url(#d)"
      style={{
        display: "block",
      }}
    >
      <path
        fill="url(#e)"
        d="M-14.654 174.771 174.771 14.654 14.654-174.771-174.771-14.654l160.117 189.425z"
        transform="matrix(.1248 0 0 .1248 16 16)"
      />
    </g>
  </svg>
);
export default SvgComponent;
