"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRemoveWorkspace } from "@/features/workspaces/api/useRemoveWorkspace";
import { useUpdateWorkspace } from "@/features/workspaces/api/useUpdateWorkspace";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
interface PreferencesModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialVal: string;
}

export const PreferencesModal = ({
  open,
  setOpen,
  initialVal,
}: PreferencesModalProps) => {
  const [editName, setEditName] = useState(initialVal);
  const [edit, setEdit] = useState(false);
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const { mutate: updateWorkspace, pending: workspaceUpdating } =
    useUpdateWorkspace();
  const { mutate: removeWorkspace, pending: removingWorkspace } =
    useRemoveWorkspace();

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateWorkspace(
      { id: workspaceId, name: editName },
      {
        onSuccess: () => {
          setEdit(false);
          toast.success("Workspace updated");
          router.replace("/");
        },
        onError: () => {
          toast.error("Failed to update workspace");
        },
      }
    );
  };
  const handleDelete = () => {
    removeWorkspace(
      { id: workspaceId },
      {
        onSuccess: () => {
          toast.success("Workspace deleted");
        },
        onError: (err) => {
          toast.error("faild to delete!");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 bg-green-50 overflow-hidden">
        <DialogHeader className="p-4 border-b bg-white rounded-lg">
          <DialogTitle>{initialVal}</DialogTitle>
          <DialogDescription>Change your preferences</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-2">
          <Dialog open={edit} onOpenChange={setEdit}>
            <DialogTrigger asChild>
              <div className="px-5 py-4 bg-white border cursor-pointer hover:bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <p className=" text-sm">workspace name</p>
                  <p className="text-sm text-sky-500 hover:underline cursor-pointer">
                    edit
                  </p>
                </div>
                <p className="font-semibold text-sm">{initialVal}</p>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit workspace name</DialogTitle>
              </DialogHeader>
              <form className="space-y-4" onSubmit={handleEdit}>
                <Input
                  disabled={workspaceUpdating}
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                  autoFocus
                  minLength={3}
                  maxLength={30}
                  placeholder="workspace name e.g. 'Gumball','Creator'"
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" disabled={workspaceUpdating}>
                      cancle
                    </Button>
                  </DialogClose>
                  <Button
                    variant="default"
                    type="submit"
                    disabled={workspaceUpdating}
                  >
                    save
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <button
            disabled={removingWorkspace}
            onClick={handleDelete}
            className="flex gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointero hover:bg-gray-50 text-rose-600"
          >
            <TrashIcon className="size-4" />
            <p className="text-sm font-semibold">Delete workspace</p>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
