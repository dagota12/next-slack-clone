import { useCurrentMember } from "@/features/members/api/useCurentMember";
import { useGetWorkspace } from "@/features/workspaces/api/useGetWorkspace";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { AlertCircle, Loader, MessageSquare } from "lucide-react";
import WorkspaceHeader from "./WorkspaceHeader";
import SidebarItem from "./SidebarItem";

const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();
  const { data: member, loading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, loading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  if (memberLoading || workspaceLoading) {
    return (
      <div className="flex flex-col bg-[#5e2c5f] h-full items-center justify-center">
        <Loader className="animate-spin size-5 text-white" />
      </div>
    );
  }
  if (!workspace || !member) {
    return (
      <div className="flex flex-col bg-[#a35496] h-full items-center justify-center">
        <AlertCircle className="size-5 text-white" />
        <p className=" text-white text-xs">workspace not found!</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col bg-[#5e2c5f] h-full">
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={member.role === "admin"}
      />
      <div className="flex flex-col px-2 mt-3">
        <SidebarItem
          label="Messages"
          Icon={MessageSquare}
          id="threads"
          variant="active"
        />
      </div>
    </div>
  );
};

export default WorkspaceSidebar;
