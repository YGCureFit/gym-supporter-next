import React, { ReactNode } from "react";
import clsx from "clsx";
import { AiOutlineClose } from "react-icons/ai";
import { Animatable } from "../Animatable/Animatable";

type ModalHeaderProps = {
  title: ReactNode;
  titleClassNames?: string;
  onClose?: (() => void) | null;
  children?: ReactNode;
  closeIcon?: any;
  customcloseIcon?: boolean;
};

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  titleClassNames,
  onClose,
  children,
  closeIcon,
  customcloseIcon,
}) => {
  return (
    <>
      <Animatable
        className={clsx(
          "flex",
          "justify-between",
          "px-6",
          "pt-6",
          "pb-3",
          "items-center",
          "sticky",
          "top-0",
          "left-0",
          "bg-gray-cf-900"
        )}
      >
        <div
          className={clsx(
            "text-gray-cf-50",
            "font-bold",
            "text-xl",
            titleClassNames
          )}
        >
          {title}
        </div>
        {onClose ? (
          <button
            onClick={onClose}
            className={clsx(
              "w-5",
              "h-5",
              "rounded-full",
              "text-gray-cf-900",
              "bg-gray-cf-50",
              "flex",
              "justify-center",
              "items-center"
            )}
          >
            {customcloseIcon ? closeIcon : <AiOutlineClose />}
          </button>
        ) : null}
      </Animatable>
      {children}
    </>
  );
};

ModalHeader.defaultProps = {
  titleClassNames: "",
  onClose: null,
  children: null,
  closeIcon: <></>,
  customcloseIcon: false,
};
