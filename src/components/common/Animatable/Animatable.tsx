"use client";
import React, { ReactNode, useRef } from "react";
import { motion } from "framer-motion";
import { ClassValue } from "clsx";

type AnimatableProps = {
  children?: ReactNode;
  className?: ClassValue;
  styles?: any;
};

export const Animatable: React.FC<AnimatableProps> = ({
  children,
  className,
  styles,
}) => {
  const compRef = useRef(`${Math.floor(Math.random() * 90000) + 10000}`);
  return (
    <motion.div
      style={styles}
      layoutId={compRef.current}
      className={className as string}
    >
      {children}
    </motion.div>
  );
};

Animatable.defaultProps = {
  className: "",
  children: null,
  styles: {},
};
