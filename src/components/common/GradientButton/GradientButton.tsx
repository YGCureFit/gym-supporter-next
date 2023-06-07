import React, { ReactNode, useRef } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

type GradientButtonProps = {
  title?: string | null;
  onClick?: (...args: any) => void;
  children?: ReactNode;
  disabled?: boolean;
  largeHorizontalPadding?: boolean;
  classNames?: string;
};

export const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onClick,
  children,
  disabled,
  largeHorizontalPadding,
  classNames,
}) => {
  const compRef = useRef(
    `cfButton${Math.floor(Math.random() * 90000) + 10000}`
  );

  return (
    <motion.button
      layoutId={compRef.current}
      type="submit"
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        {
          "bg-gray-cf-500": disabled,
          "text-gray-cf-400": disabled,
          "px-5": !largeHorizontalPadding,
          "px-14": largeHorizontalPadding,
        },
        "inline-flex",
        "flex-col",
        "justify-center",
        "items-center",
        "p-2",
        "rounded",
        "bg-gray-cf-50",
        "m-1",
        "min-w-max",
        classNames,
        "z-0"
      )}
    >
      <div
        className={clsx(
          {
            "bg-gray-cf-500": disabled,
            "text-transparent": !disabled,
            "bg-clip-text": !disabled,
            "bg-gradient-to-r": !disabled,
            "from-orange-cf": !disabled,
            "to-orange-cf": !disabled,
          },
          "text-sm",
          "font-bold",
          "uppercase"
        )}
      >
        {title?.toLocaleUpperCase?.() || children}
      </div>
    </motion.button>
  );
};

GradientButton.defaultProps = {
  title: null,
  onClick: () => {
    // do nothing
  },
  children: null,
  disabled: false,
  largeHorizontalPadding: false,
  classNames: "",
};
