"use client";
import { ReactNode, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string; // ✅ allow extra styles
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, onClick, className, ...props }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx("px-4 py-2 bg-blue-600 text-white rounded", className)}
      {...props}
    >
      {children}
    </button>
  );
}

