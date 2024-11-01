import {
  MessageSquareTextIcon,
  PencilIcon,
  SmileIcon,
  TrashIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Hint } from "./Hint";
import { EmojiPopover } from "./EmojiPopover";

interface ToolbarProps {
  isAuthor: boolean;
  isPending: boolean;
  handleEdit: () => void;
  handleThread: () => void;
  handleDelete: () => void;
  handleReaction: (value: string) => void;
  hideThreadButton?: boolean;
}
export const Toolbar = ({
  isAuthor,
  isPending,
  handleEdit,
  handleDelete,
  handleThread,
  handleReaction,
  hideThreadButton,
}: ToolbarProps) => {
  return (
    <div className="absolute top-0 right-5">
      <div className="group-hover:opacity-100 opacity-0 transition-opacity bg-white rounded-md shadow-sm">
        <EmojiPopover
          hint="add reaction"
          onEmojiSelect={(emoji) => handleReaction(emoji.native)}
        >
          <Button variant="ghost" disabled={isPending} size="iconSm">
            <SmileIcon className="size-4" />
          </Button>
        </EmojiPopover>
        {!hideThreadButton && (
          <Hint label="reply in thread">
            <Button
              variant="ghost"
              disabled={isPending}
              size="iconSm"
              onClick={handleThread}
            >
              <MessageSquareTextIcon className="size-4" />
            </Button>
          </Hint>
        )}
        {isAuthor && (
          <>
            <Hint label="edit">
              <Button
                variant="ghost"
                disabled={isPending}
                size="iconSm"
                onClick={handleEdit}
              >
                <PencilIcon className="size-4" />
              </Button>
            </Hint>
            <Hint label="delete">
              <Button
                variant="ghost"
                disabled={isPending}
                size="iconSm"
                onClick={handleDelete}
              >
                <TrashIcon className="size-4 text-rose-500" />
              </Button>
            </Hint>
          </>
        )}
      </div>
    </div>
  );
};
