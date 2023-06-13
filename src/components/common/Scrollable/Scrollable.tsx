import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useScroll, motion } from "framer-motion";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

type ScrollableProps = {
  children: React.ReactNode;
  light?: boolean;
};

const SCROLL_LENGTH = 500;

export const Scrollable: React.FC<ScrollableProps> = ({ children, light }) => {
  const elementRef = useRef<any>(null);
  const [progress, setProgress] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const { scrollXProgress } = useScroll({ container: elementRef });
  const bgColor = light ? "2a2a2a" : "171717";

  const checkScrollPositions = (): void => {
    if (elementRef.current?.scrollWidth > elementRef.current?.clientWidth) {
      setShowButtons(true);
    } else {
      setShowButtons(false);
    }
  };

  useEffect(() => {
    scrollXProgress.onChange(setProgress);
    checkScrollPositions();
    window.addEventListener("resize", checkScrollPositions);
  }, []);

  const renderButton = (left = true): React.ReactNode => (
    <div
      className={clsx(
        "xs:hidden",
        "absolute",
        {
          "left-0": left,
          "right-0": !left,
          "pl-1": left,
          "pr-10": left,
          "pr-1": !left,
          "pl-10": !left,
        },
        "top-0",
        "h-full",
        "inline-flex",
        "justify-center",
        "items-center",
        "z-10"
      )}
      style={{
        background: `linear-gradient(${left ? -270 : 270}deg, ${
          left
            ? `#${bgColor} 54.49%, #${bgColor} 10.6%`
            : `#${bgColor} 10.6%, #${bgColor} 54.49%`
        }, rgba(0, 0, 0, 0) 100%)`,
      }}
    >
      <button
        className={clsx(
          "inline-flex",
          "text-gray-cf-50",
          "h-10",
          "w-10",
          "p-2",
          "items-center",
          "justify-center",
          "rounded-full",
          "mx-2",
          "bg-gray-cf-600",
          "z-10"
        )}
        onClick={(event) => {
          event.stopPropagation();
          elementRef.current?.scrollBy(
            left ? -SCROLL_LENGTH : SCROLL_LENGTH,
            0
          );
        }}
      >
        {left ? <FaAngleLeft /> : <FaAngleRight />}
      </button>
    </div>
  );

  return (
    <div className={clsx("relative", "w-full", "h-full")}>
      <motion.div
        ref={elementRef}
        className={clsx("overflow-x-auto", "flex", "w-full", "no-scrollbar")}
        style={{
          scrollBehavior: "smooth",
        }}
        onLoadedData={() => {
          setProgress(0);
        }}
      >
        {showButtons && progress !== 0 ? renderButton() : null}
        {children}
        {showButtons && progress !== 1 ? renderButton(false) : null}
      </motion.div>
    </div>
  );
};

Scrollable.defaultProps = {
  light: false,
};
