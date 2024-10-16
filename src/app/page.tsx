"use client";
import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { signOut } = useAuthActions();
  const router = useRouter();
  return (
    <div>
      <Button
        onClick={async () => {
          await signOut();
          router.push("/auth");
        }}
      >
        logout
      </Button>
    </div>
  );
}
