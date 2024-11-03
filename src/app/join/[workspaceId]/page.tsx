"use client";

import { Button } from "@/components/ui/button";
import { useGetWorkspaceInfo } from "@/features/workspaces/api/useGetWorkspaceInfo";
import { useJoinWorkspace } from "@/features/workspaces/api/useJoinWorkspace";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import VerificationInput from "react-verification-input";
import { toast } from "sonner";

const JoinPage = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { data, loading } = useGetWorkspaceInfo({ id: workspaceId });
  const { mutate } = useJoinWorkspace();
  const isMember = useMemo(() => data?.isMember, [data?.isMember]);
  useEffect(() => {
    if (isMember) {
      router.replace(`/workspace/${workspaceId}`);
    }
  }, [isMember, workspaceId, router]);
  const handleComplete = (code: string) => {
    mutate(
      { joinCode: code, workspaceId },
      {
        onSuccess: () => {
          toast.success("Joined workspace successfully!");
          router.replace(`/workspace/${workspaceId}`);
        },
        onError: () => {
          toast.error(
            data?.isMember ? `Already a member!` : `Failed to join workspace!`
          );
        },
      }
    );
  };

  return (
    <div className="h-full flex flex-col gap-y-8 justify-center items-center p-8     rounded-lg shadow-md">
      <Image src="/social.png" alt="logo" width={60} height={60} />
      <div className="flex flex-col gap-y-4 justify-center items-center max-w-md">
        <div className="flex flex-col gap-y-4 justify-center items-center">
          <h1 className="text-2xl font-bold">
            Join {loading ? "loading..." : data?.name}
          </h1>
          <p className="text-md text-muted-foreground">
            enter the workspace join code to continue
          </p>
        </div>
        <VerificationInput
          onComplete={handleComplete}
          classNames={{
            container: "flex gap-x-2",
            character:
              "h-auto rounded-md border p-2 border-gray-300 flex items-center justify-center font-medium text-large ",
            characterInactive: "bg-muted",
            characterSelected: "bg-accent text-white",
            characterFilled: "bg-white text-black",
          }}
          autoFocus
          length={6}
          //   passwordMode
        />
      </div>
      <Button size="lg" variant="outline" asChild>
        <Link href="/">Go to Home</Link>
      </Button>
    </div>
  );
};
export default JoinPage;
