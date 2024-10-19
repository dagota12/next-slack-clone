import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
interface useCurrentMemberProps {
  workspaceId: Id<"workspaces">;
}

export const useCurrentMember = ({ workspaceId }: useCurrentMemberProps) => {
  const data = useQuery(api.members.current, { workspaceId });
  const loading = data === undefined;
  return { data, loading };
};
