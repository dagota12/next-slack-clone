import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";

interface useGetChannelsProps {
  workspaceId: Id<"workspaces">;
}
export const useGetChannels = ({ workspaceId }: useGetChannelsProps) => {
  const data = useQuery(api.channels.get, { workspaceId });
  const loading = data === undefined;
  return { data, loading };
};
