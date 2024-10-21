import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
interface useGetMembersProps {
  workspaceId: Id<"workspaces">;
}

export const useGetMembers = ({ workspaceId }: useGetMembersProps) => {
  const data = useQuery(api.members.get, { workspaceId });
  const loading = data === undefined;
  return { data, loading };
};
