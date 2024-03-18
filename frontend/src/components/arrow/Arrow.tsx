import * as React from "react";
import { JSX } from "react/jsx-runtime";

const Arrow = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      width={26}
      height={16}
      viewBox="0 0 26 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M13 16L.01.25h25.98L13 16z" fill="#D9D9D9" />
    </svg>
  );
};

export default Arrow;
