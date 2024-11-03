import { Button } from "@/components/ui/button";
import { FaChevronDown } from "react-icons/fa";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { TrashIcon } from "lucide-react";
import { useChannelId } from "@/hooks/useChannelId";
import { useUpdateChannel } from "@/features/channels/api/useUpdateChannel";
import { toast } from "sonner";
import { useRemoveChannel } from "@/features/channels/api/useRemoveChannel";
import { useConfirm } from "@/hooks/useConfirm";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { useCurrentMember } from "@/features/members/api/useCurentMember";

interface HeaderProps {
  title: string;
}
export const Header = ({ title }: HeaderProps) => {
  const router = useRouter();
  const channelId = useChannelId();
  const workspaceId = useWorkspaceId();

  const [value, setValue] = useState(title);
  const [editOpen, setEditOpen] = useState(false);

  const { data: member } = useCurrentMember({
    workspaceId,
  });
  const { mutate: updateChannel, pending: isUpdatingChannel } =
    useUpdateChannel();
  const { mutate: removeChannel, pending: isRemovingChannel } =
    useRemoveChannel();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "this will delete the channel permanently"
  );
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateChannel(
      { id: channelId, name: value },
      {
        onSuccess: () => {
          toast.success("Channel updated");
          setEditOpen(false);
        },
        onError: () => {
          toast.error("Failed to update channel");
        },
      }
    );
  };
  const handleRemove = async () => {
    const ok = await confirm();
    if (!ok) return;

    removeChannel(
      { id: channelId },
      {
        onSuccess: () => {
          toast.success("Channel removed");
          router.replace(`/workspace/${workspaceId}`);
        },
        onError: () => {
          toast.error("Failed to remove channel");
        },
      }
    );
  };
  const handleEditOpen = (value: boolean) => {
    if (member?.role !== "admin") return;

    setEditOpen(value);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "-");
    setValue(value);
  };
  return (
    <div className="bg-white  border-b h-[49px] flex items-center px-4 overflow-hidden">
      <ConfirmDialog />
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="text-lg font-semibold overflow-hidden w-auto"
            size="sm"
          >
            <span className="truncate"># {title}</span>
            <FaChevronDown className="size-2.5 ml-2" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle># {title.toUpperCase()}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-y-2">
            <Dialog open={editOpen} onOpenChange={handleEditOpen}>
              <DialogTrigger asChild>
                <div className="px-5 py-4 bg-white border cursor-pointer hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <p className=" text-sm">channel name</p>
                    {member?.role === "admin" && (
                      <p className="text-sm text-sky-500 hover:underline cursor-pointer">
                        edit
                      </p>
                    )}
                  </div>
                  <p className="font-semibold text-sm">{title}</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit channel name</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <Input
                    disabled={isUpdatingChannel}
                    value={value}
                    onChange={handleChange}
                    required
                    autoFocus
                    minLength={3}
                    maxLength={30}
                    placeholder="workspace name e.g. 'Gumball','Creator'"
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" disabled={isUpdatingChannel}>
                        cancle
                      </Button>
                    </DialogClose>
                    <Button
                      variant="default"
                      type="submit"
                      disabled={isUpdatingChannel}
                    >
                      save
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            {member?.role === "admin" && (
              <button
                disabled={isRemovingChannel}
                onClick={handleRemove}
                className="flex gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointero hover:bg-gray-50 text-rose-600"
              >
                <TrashIcon className="size-4" />
                <p className="text-sm font-semibold">Delete channel</p>
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
