import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useState, useEffect } from "react";

interface GetWorkspaceInfoProps {
  id: Id<"workspaces">;
}

export const useGetWorkspaceInfo = ({ id }: GetWorkspaceInfoProps) => {
  const data = useQuery(api.workspaces.getInfoById, { id });

  const loading = data === undefined;

  return { data, loading };
};
