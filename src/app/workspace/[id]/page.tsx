"use client";

import { useGetWorkspace } from "@/features/workspaces/api/useGetWorkspace";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { useParams } from "next/navigation";

interface WorkspaceProps {
  params: {
    id: string; //workspace id
  };
}
const Workspaces = () => {
  const workspaceId = useWorkspaceId();
  const { data, loading } = useGetWorkspace({ id: workspaceId });
  return <div>Workspace</div>;
};
export default Workspaces;
