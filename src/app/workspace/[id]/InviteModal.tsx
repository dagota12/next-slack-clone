import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNewJoinCode } from "@/features/workspaces/api/useNewJoinCode";
import { useConfirm } from "@/hooks/useConfirm";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import {
  CopyIcon,
  RefreshCcwDotIcon,
  RefreshCcwIcon,
  RefreshCwIcon,
} from "lucide-react";
import { toast } from "sonner";

interface InviteModalProps {
  open: boolean;
  name: string;
  joinCode: string;
  setOpen: (open: boolean) => void;
}
export const InviteModal = ({
  open,
  setOpen,
  joinCode,
  name,
}: InviteModalProps) => {
  const workspaceId = useWorkspaceId();
  const { mutate: newJoinCode, pending } = useNewJoinCode();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "this will invalidate the curent invite code"
  );
  const handleGenerateCode = async () => {
    const ok = await confirm();
    if (!ok) return;
    newJoinCode(
      { workspaceId },
      {
        onSuccess: () => {
          toast.success("new invite code generated");
        },
        onError: () => {
          toast.error("failed to generate new invite code");
        },
      }
    );
  };
  const handleCopy = () => {
    const inviteLink = `${window.location.origin}/workspace/${workspaceId}`;
    navigator.clipboard.writeText(inviteLink).then(() => {
      toast.success("link coppied");
    });
  };
  return (
    <>
      <ConfirmDialog />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite people to {name}</DialogTitle>
            <DialogDescription>
              Invite your friends to this workspace
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col justify-center space-y-4">
            <p className="text-4xl text-center font-bold tracking-widest">
              {joinCode}
            </p>
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              copy link <CopyIcon className="size-4 ml-2" />
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <Button
              onClick={handleGenerateCode}
              disabled={pending}
              variant="outline"
            >
              new code <RefreshCcwIcon className="size-4 ml-2" />
            </Button>
            <DialogClose asChild>
              <Button size="sm">close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
