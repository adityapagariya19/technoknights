import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
 return twMerge(clsx(...inputs));
}

export const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <div
    className={cn(
      "bg-[#151619] border border-[#141414] rounded-xl overflow-hidden",
      className
    )}
  >
    {children}
  </div>
);
