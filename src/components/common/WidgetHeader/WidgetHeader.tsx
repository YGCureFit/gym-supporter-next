import React from "react";
import clsx from "clsx";
import { Animatable } from "../Animatable/Animatable";

type WidgetHeaderProps = {
  title: string;
  children?: React.ReactNode;
  justifyContent?:
    | "normal"
    | "start"
    | "end"
    | "center"
    | "between"
    | "around"
    | "evenly"
    | "stretch";
  className?: string;
};

export const WidgetHeader: React.FC<WidgetHeaderProps> = ({
  title,
  children,
  justifyContent,
  className,
}) => {
  return (
    <Animatable
      className={clsx(
        "h-8",
        "flex",
        "items-center",
        `justify-${justifyContent}`,
        "w-full",
        "mb-1",
        `${className}`
      )}
    >
      <Animatable
        className={clsx(
          "font-semibold",
          "text-lg",
          // 'text-transparent',
          // 'bg-clip-text',
          // 'bg-gradient-to-r',
          // 'from-yellow-cf-400',
          // 'to-pink-cf',
          "text-gray-cf-50",
          "pb-2",
          "min-w-max"
        )}
      >
        {title}
      </Animatable>
      {children}
    </Animatable>
  );
};

WidgetHeader.defaultProps = {
  children: null,
  className: clsx(),
  justifyContent: "between",
};
