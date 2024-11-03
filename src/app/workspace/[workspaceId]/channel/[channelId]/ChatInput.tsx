"use client";
import { useCreateMessage } from "@/features/messages/api/useCreateMessage";
import { useGenerateUploadUrl } from "@/features/upload/api/useGenerateUploadUrl";
import { useChannelId } from "@/hooks/useChannelId";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import dynamic from "next/dynamic";
import Quill from "quill";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Id } from "../../../../../../convex/_generated/dataModel";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

type CreateMessageValues = {
  channelId: Id<"channels">;
  workspaceId: Id<"workspaces">;
  body: string;
  image?: Id<"_storage">;
  parentMessageId?: Id<"messages">;
};
interface ChatInputProps {
  placehoder: string;
}
export const ChatInput = ({ placehoder }: ChatInputProps) => {
  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();
  const [key, setKey] = useState(0); //used as a dirty way to rerender the editor
  const [pending, setPending] = useState(false);
  const editorRef = useRef<Quill | null>(null);
  const { mutate: createMessage } = useCreateMessage();
  const { mutate: generateUploadUrl } = useGenerateUploadUrl();

  const handleSubmit = async ({
    body,
    image,
  }: {
    body: string;
    image: File | null;
  }) => {
    // console.log(body, image);
    try {
      editorRef?.current?.disable();
      setPending(true);

      const values: CreateMessageValues = {
        channelId,
        workspaceId,
        body,
        image: undefined,
      };
      if (image) {
        const uploadUrl = await generateUploadUrl({}, { throwError: true });
        if (!uploadUrl) throw new Error("Failed to generate upload url");
        const result = await fetch(uploadUrl, {
          method: "POST",
          headers: {
            "Content-Type": image.type,
          },
          body: image,
        });

        if (!result.ok) {
          throw new Error("Failed to upload image");
        }
        const { storageId } = await result.json();
        values.image = storageId;
      }
      await createMessage(values, { throwError: true });

      setKey((prev) => prev + 1);
    } catch {
      toast.error("Failed to send message");
    } finally {
      editorRef?.current?.enable();
      setPending(false);
    }
  };
  return (
    <div className="px-5 w-full">
      <Editor
        key={key}
        placeholder={placehoder}
        onSubmit={handleSubmit}
        disabled={pending}
        innerRef={editorRef}
      />
    </div>
  );
};
