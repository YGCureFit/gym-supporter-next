import React, { ReactNode } from "react";
import clsx, { ClassValue } from "clsx";
import { Animatable } from "../Animatable/Animatable";

type WidgetCardProps = {
  title?: string;
  children: ReactNode;
  alignCol?: boolean;
  zeroPadding?: boolean;
  zeroPaddingVertical?: boolean;
  smallHeader?: boolean;
  classNames?: ClassValue;
  innerFlexClassNames?: ClassValue;
};

export const WidgetCard: React.FC<WidgetCardProps> = ({
  title,
  children,
  alignCol,
  zeroPadding,
  smallHeader,
  zeroPaddingVertical,
  classNames,
  innerFlexClassNames,
}) => {
  return (
    <Animatable
      className={clsx(
        "bg-gray-cf-700",
        "min-h-full",
        "w-full",
        "rounded-lg",
        {
          "px-4": !zeroPadding,
          "py-4": !zeroPadding && !zeroPaddingVertical,
        },
        classNames
      )}
    >
      {title ? (
        <Animatable
          className={clsx(
            {
              "font-semibold": !smallHeader,
              "text-base": !smallHeader,
              "text-sm": smallHeader,
            },
            "text-gray-cf-50"
          )}
        >
          {title}
        </Animatable>
      ) : null}
      <Animatable
        className={clsx(
          "flex",
          "overflow-x-scroll",
          "no-scrollbar",
          "rounded-lg",
          {
            "flex-row": !alignCol,
            "flex-col": alignCol,
            "py-2": !zeroPadding,
          },
          innerFlexClassNames
        )}
      >
        {children}
      </Animatable>
    </Animatable>
  );
};

WidgetCard.defaultProps = {
  title: "",
  alignCol: false,
  zeroPadding: false,
  smallHeader: false,
  zeroPaddingVertical: false,
  classNames: "",
  innerFlexClassNames: "",
};
