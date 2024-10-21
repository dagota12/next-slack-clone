import { useCurrentMember } from "@/features/members/api/useCurentMember";
import { useGetWorkspace } from "@/features/workspaces/api/useGetWorkspace";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { AlertCircle, Loader, MessageSquare } from "lucide-react";
import WorkspaceHeader from "./WorkspaceHeader";
import SidebarItem from "./SidebarItem";
import { useGetChannels } from "@/features/channels/api/useGetChannels";
import { FaHashtag } from "react-icons/fa";
import { WorkspaceSection } from "./workspaceSection";
import { useGetMembers } from "@/features/members/api/useGetMembers";
import { UserItem } from "./UserItem";

const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();
  const { data: member, loading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, loading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: channels, loading: channelsLoading } = useGetChannels({
    workspaceId,
  });
  const { data: members, loading: membersLoading } = useGetMembers({
    workspaceId,
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
      <WorkspaceSection label="Channels" hint="New Channel" onNew={() => {}}>
        {channels?.map((value) => (
          <SidebarItem
            key={value._id}
            label={value.name}
            Icon={FaHashtag}
            id={value._id}
          />
        ))}
      </WorkspaceSection>
      {members?.map((item) => (
        <UserItem
          key={item._id}
          id={item._id}
          label={item.user.name}
          image={item.user.image}
        />
      ))}
    </div>
  );
};

export default WorkspaceSidebar;
