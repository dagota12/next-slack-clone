import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { IconType } from "react-icons/lib";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const ItemVariants = cva(
  "flex items-center gap-1.5 justify-start text-white font-normal h-7 text-small overflow-hidden px-[18px]",
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
interface SidebarItemProps {
  id: string;
  label: string;
  Icon: LucideIcon | IconType;
  variant?: VariantProps<typeof ItemVariants>["variant"];
}

const SidebarItem = ({ Icon, label, id, variant }: SidebarItemProps) => {
  const workspaceId = useWorkspaceId();
  return (
    <Button
      variant="transparent"
      size="sm"
      asChild
      className={cn(ItemVariants({ variant }))}
    >
      <Link href={`/workspace/${workspaceId}/channel/${id}`}>
        <Icon className="size-3.5 shrink-0" />
        <span className="truncate">{label}</span>
      </Link>
    </Button>
  );
};

export default SidebarItem;
