/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface CustomButtonProps {
  text: string;
  child?: any;
  sx?: string;
  fontSize?: number
  onClick?: () => void;
}

const CustomButton = ({text, child, sx, fontSize, onClick}: CustomButtonProps) => {
  return (
    <div className={"grid place-content-center p-4" + sx}>
      <DrawOutlineButton style={{fontSize: fontSize}} onClick={onClick}>{child} {text}</DrawOutlineButton>
    </div>
  );
};

const DrawOutlineButton = ({
  children,
  ...rest
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <button
      {...rest}
      className="group relative px-4 py-2 font-medium text-slate-100 transition-colors duration-[400ms] hover:text-indigo-300 bg-[#2e2d41] cursor-pointer"
    >
      <span>{children}</span>

      {/* TOP */}
      <span className="absolute left-0 top-0 h-[2px] w-0 bg-indigo-300 transition-all duration-100 group-hover:w-full" />

      {/* RIGHT */}
      <span className="absolute right-0 top-0 h-0 w-[2px] bg-indigo-300 transition-all delay-100 duration-100 group-hover:h-full" />

      {/* BOTTOM */}
      <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-indigo-300 transition-all delay-200 duration-100 group-hover:w-full" />

      {/* LEFT */}
      <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-indigo-300 transition-all delay-300 duration-100 group-hover:h-full" />
    </button>
  );
};

export default CustomButton;