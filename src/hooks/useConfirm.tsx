import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const useConfirm = (
  title: string,
  message: string
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);
  const confirm = () =>
    new Promise((resolve, reject) => {
      setPromise({ resolve });
    });
  const handleClose = () => {
    setPromise(null);
  };
  const handleCancle = () => {
    promise?.resolve(false);
    handleClose();
  };
  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };
  const ConfirmDialog = () => {
    return (
      <Dialog open={promise !== null} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{message}</DialogDescription>
          </DialogHeader>
          <div className="flex pt-2">
            <Button onClick={handleConfirm}>Confirm</Button>
            <Button onClick={handleCancle} variant="outline">
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return [ConfirmDialog, confirm];
};
