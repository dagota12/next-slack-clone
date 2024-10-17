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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const CreateWorspaceModal = () => {
  const [open, setOpen] = useCreateWorkspaceModal();
  const [name, setName] = useState("");
  const router = useRouter();

  const { mutate, pending } = useCreateWorkspace();
  const handleClose = () => {
    setOpen(false);
    // clear form
    setName("");
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      { name },
      {
        onSuccess(id) {
          console.log(id);
          //redirect ot workspace
          toast.success("workspace created!");
          handleClose();
          router.push(`/workspace/${id}`);
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
        <form onSubmit={handleSubmit}>
          <Input
            disabled={pending}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            minLength={3}
            placeholder="workspace name e.g. 'we can do this all day','Chi'"
          />
          <div className="w-full flex justify-end mt-3">
            <Button type="submit" disabled={pending}>
              create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
