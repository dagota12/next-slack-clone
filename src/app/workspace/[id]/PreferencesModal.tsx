import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUpdateWorkspace } from "@/features/workspaces/api/useUpdateWorkspace";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
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
  const [value, setValue] = useState(initialVal);
  const { mutate: updateWorkspace, pending: WorkspaceUpdating } =
    useUpdateWorkspace();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 bg-green-50 overflow-hidden">
        <DialogHeader className="p-4 border-b bg-white rounded-lg">
          <DialogTitle>{value}</DialogTitle>
          <DialogDescription>Change your preferences</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-2">
          <div className="px-5 py-4 bg-white border cursor-pointer hover:bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <p className=" text-sm">workspace name</p>
              <p className="text-sm text-sky-500 hover:underline cursor-pointer">
                edit
              </p>
            </div>
            <p className="font-semibold text-sm">{value}</p>
          </div>
          <button
            disabled={false}
            onClick={() => {}}
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
