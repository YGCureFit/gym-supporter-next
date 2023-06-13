import React, { ReactNode } from "react";
import clsx from "clsx";

type PageContainerProps = {
  children: ReactNode;
};

export const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return <div className={clsx("w-full", "h-full")}>{children}</div>;
};

PageContainer.defaultProps = {};
