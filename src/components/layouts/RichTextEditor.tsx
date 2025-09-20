"use client";

import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import "quill/dist/quill.snow.css";

interface RichTextEditorProps {
  value?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export interface RichTextEditorRef {
  getContent: () => string;
  setContent: (content: string) => void;
  clear: () => void;
}

const RichTextEditor = forwardRef<RichTextEditorRef, RichTextEditorProps>(
  ({ value = "", onChange, placeholder = "Write something...", className }, ref) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillInstance = useRef<any>(null);

    useEffect(() => {
      let Quill: any;

      (async () => {
        if (editorRef.current && !quillInstance.current) {
          // ✅ Prevent double toolbar by clearing any existing content
          editorRef.current.innerHTML = "";

          const QuillModule = await import("quill");
          Quill = QuillModule.default;

          quillInstance.current = new Quill(editorRef.current, {
            theme: "snow",
            placeholder,
            modules: {
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                ["blockquote", "code-block"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ indent: "-1" }, { indent: "+1" }],
                [{ align: [] }],
                [{ color: [] }, { background: [] }],
                ["link", "image"],
                ["clean"],
              ],
            },
          });

          // Set initial content
          if (value) {
            quillInstance.current.clipboard.dangerouslyPasteHTML(value);
          }

          quillInstance.current.on("text-change", () => {
            const html = quillInstance.current?.root.innerHTML || "";
            onChange && onChange(html);
          });
        }
      })();

      // ✅ Clean up Quill instance and DOM to prevent duplicate toolbar
      return () => {
        if (editorRef.current) {
          editorRef.current.innerHTML = "";
        }
        quillInstance.current = null;
      };
    }, []); // Run only once

    // Update content when `value` prop changes
    useEffect(() => {
      if (quillInstance.current) {
        const currentHTML = quillInstance.current.root.innerHTML;
        if (value !== currentHTML) {
          quillInstance.current.clipboard.dangerouslyPasteHTML(value || "");
        }
      }
    }, [value]);

    // Expose public methods
    useImperativeHandle(ref, () => ({
      getContent: () => quillInstance.current?.root.innerHTML || "",
      setContent: (content: string) => {
        if (quillInstance.current) {
          quillInstance.current.clipboard.dangerouslyPasteHTML(content);
        }
      },
      clear: () => {
        if (quillInstance.current) {
          quillInstance.current.setText("");
        }
      },
    }));

    return (
      <div
        ref={editorRef}
        className={className || ""}
        style={{ minHeight: "200px" }}
      />
    );
  }
);

RichTextEditor.displayName = "RichTextEditor";

export default RichTextEditor;
