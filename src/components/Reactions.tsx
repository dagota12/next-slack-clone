import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { Doc, Id } from "../../convex/_generated/dataModel";
import { useCurrentMember } from "@/features/members/api/useCurentMember";
import { cn } from "@/lib/utils";
interface ReactionsProps {
  data: Array<
    Omit<Doc<"reactions">, "memberId"> & {
      count: number;
      memberIds: Id<"members">[];
    }
  >;
  onChange: (emoji: string) => void;
}

export const Reactions = ({ data, onChange }: ReactionsProps) => {
  const wrokspaceId = useWorkspaceId();
  const { data: currentMember } = useCurrentMember({
    workspaceId: wrokspaceId,
  });
  const currentMemberId = currentMember?._id;

  if (data.length === 0 || !currentMemberId) return null;

  return (
    <div className="flex items-center gap-1 mt-1 mb-1">
      {data.map((reaction) => (
        <button
          onClick={() => onChange(reaction.value)}
          key={reaction._id}
          className={cn(
            "h-6 px-2 rounded-full bg-slate-200/70 border border-transparent hover:bg-slate-300/70 text-slate-500  flex items-center gap-x-1",
            reaction.memberIds.includes(currentMemberId) &&
              "bg-blue-100/70 border-blue-500 text-white"
          )}
        >
          {reaction.value}
          <span
            className={cn(
              "text-xs font-semibold text-muted-foreground",
              reaction.memberIds.includes(currentMemberId) && " text-blue-500"
            )}
          >
            {reaction.count}
          </span>
        </button>
      ))}
    </div>
  );
};
