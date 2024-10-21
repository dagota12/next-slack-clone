import { Hint } from "@/components/Hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";
import { useToggle } from "react-use";
interface workspaceSectionProps {
  children: React.ReactNode;
  label: string;
  hint: string;
  onNew?: () => void;
}

export const WorkspaceSection = ({
  children,
  label,
  hint,
  onNew,
}: workspaceSectionProps) => {
  const [show, toggle] = useToggle(true);
  return (
    <div className="flex flex-col mt-3.5 px-2">
      <div className="flex items-center px-1.5 group">
        <Button
          variant="transparent"
          className="p-0.5 text-sm text-[#f9edffcc] group-hover:bg-[#5e2c5f] shrink-0 size-6"
          onClick={toggle}
        >
          <FaCaretDown
            className={cn("size-4 transition-transform", !show && "-rotate-90")}
          />
        </Button>
        <Button
          variant="transparent"
          className="px-1.5 h-[28px] justify-start text-sm text-[#f9edffcc] overflow-hidden items-center"
        >
          <span className="truncate">{label}</span>
        </Button>
        {onNew && (
          <Hint label={hint} align="center" side="top">
            <Button
              variant="transparent"
              size="iconSm"
              className="opacity-1 group-hover:opacity-100 self-end  transition-opacity p-0.5 text-sm text-[#f9edffcc] size-6 shrink-0 ml-auto"
              onClick={onNew}
              asChild
            >
              <PlusIcon className="size-5" />
            </Button>
          </Hint>
        )}
      </div>
      {show && children}
    </div>
  );
};
