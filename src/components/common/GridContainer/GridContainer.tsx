import React, { ReactNode } from "react";
import clsx from "clsx";
import { Animatable } from "../Animatable/Animatable";

type GridContainerProps = {
  children: ReactNode;
  rows?: number;
  cols?: number;
  gap?: number;
  className?: string;
};

export const GridContainer: React.FC<GridContainerProps> = ({
  children,
  rows,
  cols,
  gap,
  className,
}) => {
  const rowCss = `grid-rows-${rows}`;
  const colCss = `grid-cols-${cols}`;
  const gapCss = `gap-${gap}`;
  return (
    <Animatable
      className={clsx("grid", rowCss, colCss, gapCss, "w-full", className)}
    >
      {children}
    </Animatable>
  );
};

GridContainer.defaultProps = {
  rows: 1,
  cols: 1,
  gap: 0,
  className: "",
};
