import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetWorkspace } from "@/features/workspaces/api/useGetWorkspace";
import { useGetWorkspaces } from "@/features/workspaces/api/useGetWorkSpaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/useCreateWorkspaceModal";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const WorkspacesSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const { data: workspace, loading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: workspaces, loading: workspacesLoading } = useGetWorkspaces();

  const filterdWorkspaces = workspaces?.filter(
    (workspace) => workspace._id !== workspaceId
  );

  const [_open, setOpen] = useCreateWorkspaceModal();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none" asChild>
        <Button className="size-9 overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 text-lx ">
          {workspaceLoading ? (
            <Loader className="size-5 animate-spin shrink-0" />
          ) : (
            workspace?.name[0].toUpperCase()
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" className="w-64">
        <DropdownMenuItem
          className="flex flex-col justify-start items-start capitalize cursor-pointer"
          onClick={() => router.push(`/workspace/${workspaceId}`)}
        >
          {workspace?.name}
          <span className="text-muted-foreground text-xs">
            active workspace
          </span>
        </DropdownMenuItem>
        {filterdWorkspaces?.map((workspace) => (
          <DropdownMenuItem
            key={workspace._id}
            className="cursor-pointer capitalize overflow-hidden"
            onClick={() => router.push(`/workspace/${workspace._id}`)}
          >
            <div className="size-9 relaive overflow-hidden bg-[#616061] text-white text-lg rounded-md flex items-center justify-center mr-2">
              {workspace.name[0].toUpperCase()}
            </div>
            <p className="truncate">{workspace.name}</p>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <div className="size-9 relaive overflow-hidden bg-[#F2F2F2] text-slate-800 text-lg rounded-md flex items-center justify-center mr-2">
            <Plus />
          </div>
          create new workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WorkspacesSwitcher;
