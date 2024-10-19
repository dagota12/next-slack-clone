"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface HintProps {
  label: string;
  children: React.ReactNode;
  align: "start" | "center" | "end";
  side: "top" | "bottom" | "right" | "left";
}
export const Hint = ({ label, align, side, children }: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={150}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          className="bg-black text-white border border-white/5"
        >
          <p className="font-medium text-xs">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
