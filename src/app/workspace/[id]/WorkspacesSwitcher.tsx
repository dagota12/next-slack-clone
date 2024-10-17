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
import { Loader } from "lucide-react";
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

  useEffect(() => {
    setMounted(true);
  });
  if (!mounted) return;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WorkspacesSwitcher;
