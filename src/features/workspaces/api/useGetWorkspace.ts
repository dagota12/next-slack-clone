import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useState, useEffect } from "react";

interface GetWorkspaceProps {
  id: Id<"workspaces">;
}

export const useGetWorkspace = ({ id }: GetWorkspaceProps) => {
  const [error, setError] = useState<string | null>(null);
  const data = useQuery(api.workspaces.getById, { id });

  const loading = data === undefined;

  useEffect(() => {
    if (!loading && !data) {
      setError("Failed to fetch workspace data.");
    } else {
      setError(null); // Clear any previous errors when new data arrives
    }
  }, [data, loading]);

  return { data, loading, error };
};
