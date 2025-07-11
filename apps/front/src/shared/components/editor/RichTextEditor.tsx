"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import { cn } from "@/shared/lib/utils";
import { useEffect, useState } from "react";
import { EditorToolbar } from "./EditorToolbar";
import { RichTextEditorProps } from "./types/editor.types";
import { getEditorExtensions, getEditorProps } from "./EditorConfig";

// Error boundary component for editor initialization
function EditorErrorFallback({ error }: { error: Error }) {
    return (
        <div className="w-full rounded-md border border-red-200 bg-red-50 px-3 py-2 text-red-600">
            <p className="text-sm font-medium">Editor Error</p>
            <p className="text-xs">{error.message}</p>
        </div>
    );
}

export function RichTextEditor({
    value,
    onChange,
    placeholder = "Write something...",
    className,
    extensions = ['bold', 'italic', 'underline', 'fontSize', 'alignment', 'clearFormat', 'color'],
    minHeight = "min-h-40",
    showToolbar = true,
}: RichTextEditorProps) {
    const [error, setError] = useState<Error | null>(null);

    const editor = useEditor({
        extensions: getEditorExtensions(),
        content: value,
        editorProps: getEditorProps(placeholder),
        onUpdate({ editor }) {
            try {
                onChange(editor.getHTML());
            } catch (err) {
                console.error('Editor update error:', err);
                setError(err instanceof Error ? err : new Error('Unknown editor error'));
            }
        },
        autofocus: true,
        onCreate() {
            setError(null); // Clear any previous errors on successful creation
        },
        immediatelyRender: false, // <--- NEU
    });

    // Keep editor in sync with value prop
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            try {
                if (typeof value === "string" && value.trim().startsWith("<")) {
                    // Das ist HTML, explizit als HTML setzen!
                    editor.commands.setContent(value);
                } else {
                    editor.commands.setContent(value || "");
                }
            } catch (err) {
                console.error('Editor content sync error:', err);
                setError(err instanceof Error ? err : new Error('Content sync error'));
            }
        }
    }, [value, editor]);

    // Show error state if editor failed to initialize
    if (error) {
        return <EditorErrorFallback error={error} />;
    }

    if (!editor) {
        return (
            <div className={cn("flex flex-col gap-2", className)}>
                {showToolbar && (
                    <div className="flex flex-wrap items-center gap-1 border-b pb-2 mb-2 bg-muted/40 rounded-t-md px-2 h-10 animate-pulse" />
                )}
                <div className={cn(
                    "bg-background rounded-b-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 transition shadow-sm animate-pulse",
                    minHeight
                )} />
            </div>
        );
    }

    return (
        <div className={cn("flex flex-col gap-2", className)}>
            {showToolbar && <EditorToolbar editor={editor} extensions={extensions} />}
            <EditorContent
                editor={editor}
                className={cn(
                    "prose bg-background rounded-b-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 transition shadow-sm",
                    minHeight
                )}
            />
        </div>
    );
} 