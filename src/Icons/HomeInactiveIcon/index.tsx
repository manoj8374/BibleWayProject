import * as React from "react";

interface HomeInactiveIconProps {
    width?: number;
    height?: number;
    isActive?: boolean;
}

const HomeInactiveIcon = (props: HomeInactiveIconProps) => (
  <svg
    width={props.width || 30}
    height={props.height || 30}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M25.7004 12.7362L16.3254 3.36124C15.9738 3.00988 15.4971 2.8125 15 2.8125C14.5029 2.8125 14.0262 3.00988 13.6746 3.36124L4.29962 12.7362C4.12467 12.9099 3.98598 13.1166 3.89163 13.3443C3.79727 13.5721 3.74913 13.8163 3.75001 14.0628V25.3128C3.75001 25.5614 3.84878 25.7999 4.0246 25.9757C4.20041 26.1515 4.43887 26.2503 4.68751 26.2503H25.3125C25.5612 26.2503 25.7996 26.1515 25.9754 25.9757C26.1512 25.7999 26.25 25.5614 26.25 25.3128V14.0628C26.2509 13.8163 26.2028 13.5721 26.1084 13.3443C26.014 13.1166 25.8754 12.9099 25.7004 12.7362ZM24.375 24.3753H5.62501V14.0628L15 4.6878L24.375 14.0628V24.3753Z"
      fill="url(#paint0_linear_6575_6601)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_6575_6601"
        x1={15}
        y1={2.8125}
        x2={15}
        y2={26.2503}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.5} stopColor="#570000" />
        <stop offset={1} stopColor="#0860C4" />
      </linearGradient>
    </defs>
  </svg>
);
export default HomeInactiveIcon;
