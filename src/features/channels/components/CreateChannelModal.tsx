import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreateChannelModal } from "../store/useCreateChannelModal";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { useCreateChannel } from "../api/useCreateChannel";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCurrentMember } from "@/features/members/api/useCurentMember";

export const CreateChannelModal = () => {
  const router = useRouter();
  const [open, setOpen] = useCreateChannelModal();
  const [name, setName] = useState("");
  const { mutate, pending } = useCreateChannel();
  const workspaceId = useWorkspaceId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "-");
    setName(value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      { name, workspaceId },
      {
        onSuccess: (id) => {
          handleClose();
          //redirect to channel
          router.push(`/workspace/${workspaceId}/channel/${id}`);
        },
        onError(err) {
          toast.error("faild to create channel");
        },
      }
    );
  };
  const handleClose = () => {
    setOpen(false);
    setName("");
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Channel</DialogTitle>
          <DialogDescription>create your channel</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            disabled={pending}
            value={name}
            onChange={handleChange}
            autoFocus
            required
            minLength={3}
            maxLength={40}
            className=""
            placeholder="eg. 'Fun and Games'"
          />
          <div className="flex justify-end p-2">
            <Button disabled={pending} type="submit">
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
