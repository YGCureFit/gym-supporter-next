import React, { ReactNode } from "react";
import clsx from "clsx";
import { Animatable } from "../Animatable/Animatable";

type FooterProps = {
  children: ReactNode;
};

export const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <Animatable
      className={clsx(
        "flex",
        "w-full",
        "justify-center",
        "items-center",
        "self-end",
        "bottom-0",
        "right-0"
      )}
    >
      {children}
    </Animatable>
  );
};

Footer.defaultProps = {};
