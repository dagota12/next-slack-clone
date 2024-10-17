"use client";
import { Button } from "@/components/ui/button";
import UserButton from "@/features/auth/components/UserButton";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { signOut } = useAuthActions();
  const router = useRouter();
  return (
    <div>
      <UserButton />
      {/* <Button
        onClick={async () => {
          await signOut();
          router.push("/auth");
        }}
      >
        logout
      </Button> */}
    </div>
  );
}
