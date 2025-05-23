import React, { type JSX } from "react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  children: React.ReactNode;
  h: 1 | 2 | 3;
}

const GradientHeading: React.FC<Props> = ({ className = "", children, h }) => {
  const Tag = `h${h}` as keyof JSX.IntrinsicElements;
  const classes = cn(
    "bg-clip-text text-transparent bg-gradient-to-b from-primary to-primary/80",
    className
  );

  return <Tag className={classes}>{children}</Tag>;
};

export default GradientHeading;
