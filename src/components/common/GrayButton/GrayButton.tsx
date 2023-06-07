import React, { ReactNode } from "react";
import clsx from "clsx";

type GrayButtonProps = {
  title?: string | null;
  onClick?: (...args: any) => void;
  children?: ReactNode;
  disabled?: boolean;
  textSize?: "xs" | "sm" | "base" | "lg";
  classNames?: any;
};

export const GrayButton: React.FC<GrayButtonProps> = ({
  title,
  onClick,
  children,
  disabled,
  textSize,
  classNames,
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={(event) => {
        event.stopPropagation();
        if (onClick) onClick();
      }}
      className={clsx(
        {
          "text-gray-cf-400": disabled,
        },
        "inline-flex",
        "flex-col",
        "justify-center",
        "items-center",
        "p-2",
        "px-4",
        "rounded",
        `text-${textSize}`,
        "text-gray-cf-200",
        "bg-gray-cf-500",
        "m-1",
        "font-bold",
        "min-w-max",
        classNames,
        "uppercase"
      )}
    >
      {title?.toLocaleUpperCase?.() || children}
    </button>
  );
};

GrayButton.defaultProps = {
  title: null,
  onClick: () => {
    // do nothing
  },
  children: null,
  disabled: false,
  textSize: "sm",
  classNames: "",
};
