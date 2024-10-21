"use client";

import { CreateChannelModal } from "@/features/channels/components/CreateChannelModal";
import { CreateWorspaceModal } from "@/features/workspaces/components/CreateWorkspacesModal";
import { useEffect, useState } from "react";

export const Modals = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  });
  if (!mounted) return null;
  return (
    <>
      <CreateWorspaceModal />
      <CreateChannelModal />
    </>
  );
};
