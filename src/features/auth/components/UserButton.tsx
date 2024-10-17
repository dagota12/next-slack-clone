"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "../api/useCurrentUser";
import { Loader, Loader2, LoaderCircle, LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";

export default function UserButton() {
  const { data, loading } = useCurrentUser();
  const { signOut } = useAuthActions();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(); // Sign out the user
      // Redirect to the login page immediately
    } catch (error) {
      console.error("Failed to log out", error); // Handle errors if signOut fails
    } finally {
      router.push("/auth");
    }
  };
  if (loading) {
    return <LoaderCircle className="animate-spin shrink-0" />;
  }
  if (!data) {
    return null;
  }
  const { name, email, image } = data;
  const avatarFallback = name?.charAt(0).toUpperCase();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none">
        <Avatar>
          <AvatarImage src={image} alt={name} />
          <AvatarFallback className="bg-sky-500 text-white">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="size-4  mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
