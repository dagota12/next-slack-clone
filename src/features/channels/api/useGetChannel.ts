import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";

interface useGetChannelsProps {
  id: Id<"channels">;
}
export const useGetChannel = ({ id }: useGetChannelsProps) => {
  const data = useQuery(api.channels.getById, { id });
  const loading = data === undefined;
  return { data, loading };
};
