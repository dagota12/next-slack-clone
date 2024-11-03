"use client";
import { useEffect, useMemo } from "react";
import { useGetChannels } from "@/features/channels/api/useGetChannels";
import { useCreateChannelModal } from "@/features/channels/store/useCreateChannelModal";
import { useGetWorkspace } from "@/features/workspaces/api/useGetWorkspace";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { useRouter } from "next/navigation";
import { AlertTriangleIcon, Loader } from "lucide-react";
import { useCurrentMember } from "@/features/members/api/useCurentMember";

const Workspaces = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { data: workspace, loading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: channels, loading: channelLoading } = useGetChannels({
    workspaceId: workspaceId,
  });
  const { data: member, loading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const isAdmin = useMemo(() => member?.role === "admin", [member?.role]);
  const [open, setOpen] = useCreateChannelModal();

  const channelId = useMemo(() => channels?.[0]?._id, [channels]);

  useEffect(() => {
    if (
      workspaceLoading ||
      channelLoading ||
      memberLoading ||
      !member ||
      !workspace
    )
      return;
    if (channelId) {
      router.push(`/workspace/${workspaceId}/channel/${channelId}`);
    } else if (!open && isAdmin) {
      setOpen(true);
    }
  }, [
    workspaceLoading,
    channelLoading,
    workspace,
    workspaceId,
    channelId,
    open,
    setOpen,
    router,
    memberLoading,
    isAdmin,
    member,
  ]);
  if (workspaceLoading || channelLoading || memberLoading) {
    return (
      <div className="h-full flex flex-1 flex-col gap-2 items-center justify-center">
        <Loader className="animate-spin size-5" />
      </div>
    );
  }
  if (!workspace || !member) {
    return (
      <div className="h-full flex flex-1 flex-col gap-2 items-center justify-center">
        <AlertTriangleIcon className="size-5 mr-2" />{" "}
        <span className="text-sm text-muted-foreground">
          Workspace not found
        </span>
      </div>
    );
  }
  if (channels?.length == 0) {
    return (
      <div className="h-full flex flex-1 flex-col gap-2 items-center justify-center">
        <AlertTriangleIcon className="size-5 mr-2 text-red-500" />
        <span className="text-sm text-muted-foreground">no channel found!</span>
      </div>
    );
  }
  return null;
};
export default Workspaces;
