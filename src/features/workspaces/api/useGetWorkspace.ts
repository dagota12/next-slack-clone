import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useState, useEffect } from "react";

interface GetWorkspaceProps {
  id: Id<"workspaces">;
}

export const useGetWorkspace = ({ id }: GetWorkspaceProps) => {
  const data = useQuery(api.workspaces.getById, { id });

  const loading = data === undefined;

  return { data, loading };
};
