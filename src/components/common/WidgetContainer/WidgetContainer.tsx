import React, { ReactNode } from "react";
import clsx, { ClassValue } from "clsx";

type WidgetContainerProps = {
  children: ReactNode;
  classNames?: ClassValue;
};

export const WidgetContainer: React.FC<WidgetContainerProps> = ({
  children,
  classNames,
}) => {
  return (
    <div
      className={clsx(
        "w-full",
        "h-max",
        "p-6",
        "flex",
        "flex-col",
        "justify-start",
        classNames as ClassValue
      )}
    >
      {children}
    </div>
  );
};

WidgetContainer.defaultProps = {
  classNames: "",
};
