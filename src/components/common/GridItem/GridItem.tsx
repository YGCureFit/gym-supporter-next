import React, { ReactNode } from "react";
import clsx from "clsx";
import { Animatable } from "../Animatable/Animatable";

type GridItemProps = {
  rowSpan?: number;
  colSpan?: number;
  children: ReactNode;
};

export const GridItem: React.FC<GridItemProps> = ({
  children,
  rowSpan,
  colSpan,
}) => {
  const rowSpanCss = `row-span-${rowSpan}`;
  const colSpanCss = `col-span-${colSpan}`;
  return (
    <Animatable className={clsx(rowSpanCss, colSpanCss)}>{children}</Animatable>
  );
};

GridItem.defaultProps = {
  rowSpan: 1,
  colSpan: 1,
};
