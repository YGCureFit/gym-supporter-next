import React, { ReactNode } from "react";
import clsx, { ClassValue } from "clsx";
import { Animatable } from "../Animatable/Animatable";

type ModalProps = {
  children?: ReactNode;
  visible: boolean;
  bodyWidth?: ClassValue;
  bodyHeight?: ClassValue;
  borderRadius?: ClassValue;
};

export const Modal: React.FC<ModalProps> = ({
  children,
  bodyWidth,
  visible,
  bodyHeight,
  borderRadius,
}) => {
  if (!visible) {
    return null;
  }
  return (
    <Animatable
      className={clsx(
        "top-0",
        "left-0",
        "bg-gray-cf-800",
        "fixed",
        "z-40",
        "w-screen",
        "h-screen",
        "backdrop-filter backdrop-blur bg-opacity-60",
        "flex",
        "justify-center",
        "items-center",
        "overflow-hidden",
        "overscroll-none",
        "p-1"
      )}
    >
      <Animatable
        className={clsx(
          bodyWidth,
          bodyHeight,
          "bg-gray-cf-900",
          "rounded-lg",
          "overflow-y-scroll",
          "overscroll-none",
          borderRadius
        )}
      >
        {children}
      </Animatable>
    </Animatable>
  );
};

Modal.defaultProps = {
  children: null,
  bodyWidth: "w-1/4",
  bodyHeight: "h-4/6",
  borderRadius: "rounded-lg",
};
