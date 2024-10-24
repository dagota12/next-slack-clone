import dynamic from "next/dynamic";
import Quill from "quill";
import { useRef } from "react";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

interface ChatInputProps {
  placehoder: string;
}
export const ChatInput = ({ placehoder }: ChatInputProps) => {
  const editorRef = useRef<Quill | null>(null);
  return (
    <div className="px-5 w-full">
      <Editor
        placeholder={placehoder}
        onSubmit={(value) => console.log(value)}
        disabled={false}
        innerRef={editorRef}
      />
    </div>
  );
};
