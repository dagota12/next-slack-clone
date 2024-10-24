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
  align?: "start" | "center" | "end";
  side?: "top" | "bottom" | "right" | "left";
  asChild?: boolean;
}
export const Hint = ({
  label,
  align = "center",
  side = "top",
  asChild = false,
  children,
}: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={150}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
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
