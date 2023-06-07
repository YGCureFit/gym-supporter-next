import React, { ReactNode } from "react";
import clsx from "clsx";

type IconButtonProps = {
  children: ReactNode;
  onClick: (e: any) => void;
  ref?: any;
  noBackground?: boolean;
  customClass?: string[] | null;
};

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  onClick,
  ref,
  noBackground,
  customClass,
}) => {
  return (
    <button
      ref={ref}
      className={
        customClass && customClass.length
          ? clsx(
              "inline-flex",
              "text-gray-cf-50",
              "h-10",
              "w-10",
              "p-2",
              "items-center",
              "justify-center",
              "rounded-full",
              "mx-2",
              ...[customClass],
              {
                "shadow-xl": !noBackground,
              }
            )
          : clsx(
              "inline-flex",
              "text-gray-cf-50",
              "h-10",
              "w-10",
              "p-2",
              "items-center",
              "justify-center",
              "rounded-full",
              "mx-2",
              {
                "bg-gray-cf-700": !noBackground,
                "shadow-xl": !noBackground,
              }
            )
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

IconButton.defaultProps = {
  ref: null,
  noBackground: false,
  customClass: null,
};
