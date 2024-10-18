import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Doc } from "../../../../convex/_generated/dataModel";
import { ChevronDownIcon } from "lucide-react";
interface WorkSpaceHeaderProps {
  workspace: Doc<"workspaces">;
}
const WorkspaceHeader = ({ workspace }: WorkSpaceHeaderProps) => {
  return (
    <div className="flex items-center justify-between h-[49px] px-2 gap-0.5 ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="transparent"
            className="font-semibold text-lg w-auto p-1.5 text-white"
            size="sm"
          >
            <span className="truncate max-w-56">{workspace?.name}</span>
            <ChevronDownIcon className="s-4 ml-1 shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start" className="w-64">
          <DropdownMenuItem className="cursor-pointer capitalize">
            <div className="size-9 relative overflow-hidden text-white text-xl rounded-md flex items-center justify-center bg-[#5E5E5E] mr-2">
              {workspace?.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col items-start">
              <p className="font-bold">{workspace?.name}</p>
              <p className="text-muted-foreground text-sm">Active workspace</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default WorkspaceHeader;
