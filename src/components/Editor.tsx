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
import { ImageIcon, SmileIcon, XIcon } from "lucide-react";
import { Hint } from "./Hint";
import { Delta, Op } from "quill/core";
import { EmojiPopover } from "./EmojiPopover";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
  const [image, setImage] = useState<File | null>(null);

  const imageElementRef = useRef<HTMLInputElement | null>(null); // image selector
  const containerRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef(onSubmit);
  const placeholderRef = useRef(placeholder);
  const quillRef = useRef<Quill | null>(null);
  const defaultValueRef = useRef<Delta | Op[]>(defaultValue);
  const disabledRef = useRef(disabled);

  //show or hide text formatting toolbar
  const handleToolbarToggle = () => {
    setToolbarVisible((prev) => !prev);
    const toolbarElem = containerRef.current?.querySelector(".ql-toolbar");
    if (toolbarElem) {
      toolbarElem.classList.toggle("hidden");
    }
  };
  //on emoji select
  const onEmojiSelect = (emoji: any) => {
    const quill = quillRef.current;
    quill?.insertText(quill?.getSelection()?.index || 0, emoji.native);
  };

  //on image select
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files![0]);
    console.log(e.target.files);
  };
  useEffect(() => {
    if (!image) return;
    console.log(URL.createObjectURL(image));
  }, [image]);

  //init refs
  useLayoutEffect(() => {
    submitRef.current = onSubmit;
    placeholderRef.current = placeholder;
    defaultValueRef.current = defaultValue;
    disabledRef.current = disabled;
  });
  // create quill instance
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );
    //quill accepts config options
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
                const text = quill.getText();
                const addedImg = imageElementRef.current?.files?.[0] || null;
                const isEmpty =
                  !addedImg && text.replace(/<(.|\n)*?>/g, "").trim() === "";

                if (isEmpty) return;

                const body = JSON.stringify(quillRef.current?.getContents());
                submitRef.current({ image: addedImg, body });
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
    //instantiate quill
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
    //cleanup on unmount
    return () => {
      quill.off(Quill.events.TEXT_CHANGE);
      if (container) {
        container.innerHTML = "";
      }
      if (quillRef.current) quillRef.current = null;
      if (innerRef?.current) innerRef.current = null;
    };
  }, [innerRef]);

  //set edotor value is empty
  const isEmpty = !!image && text.replace(/<(.|\n)*?>/g, "").trim() === "";

  return (
    <div className="flex flex-col">
      <input
        type="file"
        accept="image/*"
        ref={imageElementRef}
        className="hidden"
        onChange={handleImageSelect}
      />

      <div
        className={cn(
          "flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:shadow-sm focus-within:border-slate-300 transition bg-white",
          disabled && "opacity-50"
        )}
      >
        <div ref={containerRef} className="h-full ql-custom" />
        {!!image && (
          <div className="p-2">
            <div className="relative size-[62px] flex items-center justify-center group/image">
              <Hint label="Remove image">
                <button
                  className="hidden group-hover/image:flex rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-[4] border-2 border-white items-center justify-center"
                  onClick={() => {
                    setImage(null);
                    imageElementRef.current!.value = "";
                  }}
                >
                  <XIcon className="size-4" />
                </button>
              </Hint>
              <Image
                src={URL.createObjectURL(image)}
                alt="upload"
                fill
                className="rounded-xl overflow-hidden border object-cover"
              />
            </div>
          </div>
        )}
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

          <EmojiPopover onEmojiSelect={onEmojiSelect}>
            <Button disabled={disabled} size="iconSm" variant="ghost">
              <SmileIcon className="size-4" />
            </Button>
          </EmojiPopover>
          {variant === "create" && (
            <Hint label="image">
              <Button
                disabled={disabled}
                size="iconSm"
                variant="ghost"
                onClick={() => imageElementRef.current?.click()}
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
                onClick={onCancel}
              >
                cancle
              </Button>
              <Button
                disabled={disabled || isEmpty}
                size="sm"
                className=" bg-[#007a5a] hover:bg-[#007a5a]/90 text-white"
                onClick={() => {
                  onSubmit({
                    image,
                    body: JSON.stringify(quillRef.current?.getContents()),
                  });
                }}
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
              onClick={() => {
                onSubmit({
                  image,
                  body: JSON.stringify(quillRef.current?.getContents()),
                });
              }}
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
