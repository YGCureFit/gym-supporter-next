import React, { ReactNode } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { HeaderNotification } from "../../contextProviders/headerNotificationContext";

type HeaderProps = {
  title?: string;
  children?: ReactNode;
};

export const Header: React.FC<HeaderProps> = ({ title, children }) => {
  return (
    <>
      <div
        className={clsx(
          "h-16",
          "flex",
          "items-center",
          "justify-between",
          "top-0",
          "w-full",
          "sticky",
          "z-20",
          "bg-gray-cf-500",
          "backdrop-filter backdrop-blur-xl bg-opacity-20",
          "py-10",
          "px-6"
        )}
      >
        {title ? (
          <motion.div
            layoutId="headerNotification"
            className={clsx("font-bold", "text-2xl", "text-gray-50")}
          >
            {title}
          </motion.div>
        ) : null}
        {children}
      </div>
      <HeaderNotification />
    </>
  );
};

Header.defaultProps = {
  children: null,
  title: "",
};
