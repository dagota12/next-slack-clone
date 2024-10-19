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
import {
  ChevronDownIcon,
  FilterIcon,
  ListFilter,
  SquarePen,
} from "lucide-react";
import { Hint } from "@/components/Hint";
interface WorkSpaceHeaderProps {
  workspace: Doc<"workspaces">;
  isAdmin: boolean;
}
const WorkspaceHeader = ({ workspace, isAdmin }: WorkSpaceHeaderProps) => {
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
          {isAdmin && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={() => {}}>
                Invite your team to &nbsp;{" "}
                <span className="font-semibold">{workspace.name}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={() => {}}>
                Preferences
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex items-center gap-1.5">
        <Hint label="New conversation" align="end" side="bottom">
          <Button variant="transparent" size="iconSm">
            <SquarePen className="size-5 text-white" />
          </Button>
        </Hint>
        <Hint label="Filter" align="end" side="bottom">
          <Button variant="transparent" size="iconSm">
            <ListFilter className="size-5 text-white" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};

export default WorkspaceHeader;
