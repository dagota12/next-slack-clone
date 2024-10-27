import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

interface ThumbnailProps {
  url: string | undefined | null;
}

export const Thumbnail = ({ url }: ThumbnailProps) => {
  if (!url) return null;

  return (
    <Dialog>
      <DialogTrigger>
        <div className="relative overflow-hidden max-w-[360px] border rounded-lg my-2 cursor-zoom-in">
          <img
            className="rounded-md object-cover size-full"
            src={url}
            alt="message image"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 border-none bg-transparent shadow-none">
        <DialogTitle className="hidden" />
        <div className="relative overflow-hidden max-w-[800px]">
          <img
            className="rounded-md object-cover size-full"
            src={url}
            alt="message image"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
