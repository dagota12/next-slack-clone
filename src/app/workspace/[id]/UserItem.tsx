import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Id } from "../../../../convex/_generated/dataModel";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import Link from "next/link";

const ItemVariants = cva(
  "flex items-center gap-1.5 justify-start text-white font-normal h-7 text-small overflow-hidden px-4",
  {
    variants: {
      variant: {
        default: "text-[#f9edffcc]",
        active:
          "text-[#481349] bg-white/90 hover:bg-white/90 hover:text-[#333]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
interface UserItemProps {
  id: Id<"members">;
  label?: string;
  image?: string;
  variant?: VariantProps<typeof ItemVariants>["variant"];
}

export const UserItem = ({
  id,
  label = "member",
  image,
  variant,
}: UserItemProps) => {
  const workspaceId = useWorkspaceId();
  const avatarFallback = label?.charAt(0).toUpperCase();
  return (
    <Button
      variant="transparent"
      className={cn(ItemVariants({ variant }))}
      size="sm"
      asChild
    >
      <Link href={`/workspace/${workspaceId}/member/${id}`}>
        <Avatar className="size-5 rounded-md mr-1">
          <AvatarImage src={image} className="rounded-md bg-black" />
          <AvatarFallback className="rounded-md">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm truncate">{label}</span>
      </Link>
    </Button>
  );
};
