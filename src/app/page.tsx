"use client";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/useCreateWorkspaceModal";
import { useGetWorkspaces } from "@/features/workspaces/api/useGetWorkSpaces";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function Home() {
  const router = useRouter();

  const { data, loading } = useGetWorkspaces();
  const workspaceId = useMemo(() => data?.[0]?._id, [data]);
  const [open, setOpen] = useCreateWorkspaceModal();
  useEffect(() => {
    if (loading) return;
    if (workspaceId) {
      console.log("redirect to workspace");
      router.replace(`/workspace/${workspaceId}`);
    } else if (!open) {
      setOpen(true);
    } else {
      console.log("open creation modal");
    }
  }, [workspaceId, loading, open, setOpen, router]);
}
