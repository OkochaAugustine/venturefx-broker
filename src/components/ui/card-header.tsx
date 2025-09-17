import React from "react";

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => {
  return (
    <div className={`font-bold mb-2 ${className || ""}`}>
      {children}
    </div>
  );
};
