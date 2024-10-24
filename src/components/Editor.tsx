import {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Quill, { QuillOptions } from "quill";
import "quill/dist/quill.snow.css";
import { PiTextAa } from "react-icons/pi";
import { MdSend } from "react-icons/md";
import { Button } from "./ui/button";
import { ImageIcon, SmileIcon } from "lucide-react";
import { Hint } from "./Hint";
import { Delta, Op } from "quill/core";

type EditorValue = {
  image: File | null;
  body: string;
};
interface EditorProps {
  variant?: "update" | "create";
  placeholder?: string;
  defaultValue?: Delta | Op[];
  disabled?: boolean;
  innerRef?: MutableRefObject<Quill | null>;
  onSubmit: ({ image, body }: EditorValue) => void;
  onCancel?: () => void;
}

const Editor = ({
  onCancel,
  onSubmit,
  placeholder = "write something...",
  defaultValue = [],
  disabled = false,
  innerRef,
  variant = "create",
}: EditorProps) => {
  const [text, setText] = useState("");
  const [toolbarVisible, setToolbarVisible] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef(onSubmit);
  const placeholderRef = useRef(placeholder);
  const quillRef = useRef<Quill | null>(null);
  const defaultValueRef = useRef<Delta | Op[]>(defaultValue);
  const disabledRef = useRef(disabled);

  const handleToolbarToggle = () => {
    setToolbarVisible((prev) => !prev);
    const toolbarElem = containerRef.current?.querySelector(".ql-toolbar");
    if (toolbarElem) {
      toolbarElem.classList.toggle("hidden");
    }
  };
  useLayoutEffect(() => {
    submitRef.current = onSubmit;
    placeholderRef.current = placeholder;
    defaultValueRef.current = defaultValue;
    disabledRef.current = disabled;
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );

    const options: QuillOptions = {
      theme: "snow",
      placeholder: placeholderRef.current,
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          ["link"],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
        keyboard: {
          bindings: {
            enter: {
              key: "Enter",
              handler: () => {
                return;
              },
            },
            shift_enter: {
              key: "Enter",
              shiftKey: true,
              handler: () => {
                quill.insertText(quill.getSelection()?.index || 0, "\n");
              },
            },
          },
        },
      },
    };
    const quill = new Quill(editorContainer, options);
    quillRef.current = quill;
    quillRef.current.focus();

    if (innerRef) {
      innerRef.current = quill;
    }
    quill.setContents(defaultValueRef.current);
    setText(quill.getText());

    quill.on(Quill.events.TEXT_CHANGE, () => {
      setText(quill.getText());
    });
    return () => {
      quill.off(Quill.events.TEXT_CHANGE);
      if (container) {
        container.innerHTML = "";
      }
      if (quillRef.current) quillRef.current = null;
      if (innerRef?.current) innerRef.current = null;
    };
  }, [innerRef]);
  const isEmpty = text.replace(/<(.|\n)*?>/g, "").trim() === "";

  return (
    <div className="flex flex-col">
      <div className="flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:shadow-sm focus-within:border-slate-300 transition bg-white">
        <div ref={containerRef} className="h-full ql-custom" />
        <div className="flex px-2 py-2 z-[5]">
          <Hint label={toolbarVisible ? "Hide toolbar" : "show toolbar"}>
            <Button
              disabled={disabled}
              size="iconSm"
              variant="ghost"
              onClick={handleToolbarToggle}
            >
              <PiTextAa className="size-4" />
            </Button>
          </Hint>

          <Hint label="Emoji">
            <Button
              disabled={disabled}
              size="iconSm"
              variant="ghost"
              onClick={() => {}}
            >
              <SmileIcon className="size-4" />
            </Button>
          </Hint>
          {variant === "create" && (
            <Hint label="image">
              <Button
                disabled={disabled}
                size="iconSm"
                variant="ghost"
                onClick={() => {}}
              >
                <ImageIcon className="size-4" />
              </Button>
            </Hint>
          )}

          {variant === "update" && (
            <div className="ml-auto flex items-center gap-x-2">
              <Button
                disabled={disabled}
                size="sm"
                variant="outline"
                className=""
                onClick={() => {}}
              >
                cancle
              </Button>
              <Button
                disabled={disabled || isEmpty}
                size="sm"
                className=" bg-[#007a5a] hover:bg-[#007a5a]/90 text-white"
                onClick={() => {}}
              >
                save
              </Button>
            </div>
          )}

          {variant === "create" && (
            <Button
              disabled={isEmpty || disabled}
              size="iconSm"
              variant="ghost"
              className="ml-auto bg-[#007a5a] hover:bg-[#007a5a]/90 text-white hover:text-white rounded-md"
              onClick={() => {}}
            >
              <MdSend className="size-4" />
            </Button>
          )}
        </div>
      </div>
      <div className="flex items-start justify-end p-1">
        <p className="text-xs text-slate-500">
          shift+ return to insert newline
        </p>
      </div>
    </div>
  );
};

export default Editor;
