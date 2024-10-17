"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateWorkspaceModal } from "../store/useCreateWorkspaceModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/useCreateWorkspaces";

export const CreateWorspaceModal = () => {
  const [open, setOpen] = useCreateWorkspaceModal();

  const { mutate } = useCreateWorkspace();
  const handleClose = () => {
    setOpen(false);
    // clear form
  };
  const handleSubmit = () => {
    mutate(
      { name: "workspace 1" },
      {
        onSuccess() {
          //redirect ot workspace
        },
        onError() {
          // show error
        },
        onSettled() {
          // reset input
        },
      }
    );
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create workspace</DialogTitle>
          <DialogDescription>
            create your workspaces and invite your team
          </DialogDescription>
        </DialogHeader>
        <form>
          <Input
            disabled={false}
            required
            autoFocus
            minLength={3}
            placeholder="workspace name e.g. 'we can do this all day','Chi'"
          />
        </form>
        <Button type="submit">create</Button>
      </DialogContent>
    </Dialog>
  );
};
