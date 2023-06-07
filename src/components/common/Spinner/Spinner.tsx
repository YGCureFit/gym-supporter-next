import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

type SpinnerMiniProps = {
  size?: 1 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
};

const spinTransition = {
  loop: Infinity,
  ease: "linear",
  duration: 1,
};

export const Spinner: React.FC<SpinnerMiniProps> = ({ size }) => {
  const width = `w-${size}`;
  const height = `h-${size}`;
  return (
    <div
      className={clsx(
        "relative",
        width,
        height,
        "box-border",
        "self-center",
        "m-2"
      )}
    >
      <motion.span
        className={clsx(
          "block",
          width,
          height,
          "border",
          "border-t-4",
          "border-solid",
          "box-border",
          "rounded-full",
          "top-0",
          "left-0",
          "border-gray-cf-200"
        )}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
    </div>
  );
};

Spinner.defaultProps = {
  size: 4,
};
