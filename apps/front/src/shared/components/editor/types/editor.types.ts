import { Editor } from '@tiptap/core';

export type EditorExtension =
    | 'bold'
    | 'italic'
    | 'underline'
    | 'fontSize'
    | 'alignment'
    | 'clearFormat'
    | 'color';

export interface RichTextEditorProps {
    value: string;
    onChange: (content: string) => void;
    placeholder?: string;
    className?: string;
    editorContentClassName?: string;
    extensions?: EditorExtension[];
    minHeight?: string;
    showToolbar?: boolean;
}

export interface EditorToolbarProps {
    editor: Editor | null;
    extensions?: EditorExtension[];
}

export interface FontSizeOption {
    label: string;
    size?: string;
    className: string;
}

export interface ColorOption {
    label: string;
    color: string;
    className: string;
}

// Constants for better maintainability
export const BUTTON_SIZE_CLASS = "h-8 w-8";
export const ICON_SIZE_CLASS = "h-4 w-4";

export const FONT_SIZES: FontSizeOption[] = [
    { label: "A", size: undefined, className: "font-normal" },
    { label: "A", size: "1.5rem", className: "font-bold text-lg" },
    { label: "A", size: "2rem", className: "font-extrabold text-xl" },
];

export const COLOR_OPTIONS: ColorOption[] = [
    { label: "⚫", color: "#000000", className: "text-black" },
    { label: "🔴", color: "#dc2626", className: "text-red-600" },
    { label: "🟢", color: "#16a34a", className: "text-green-600" },
    { label: "🔵", color: "#2563eb", className: "text-blue-600" },
    { label: "🟡", color: "#ca8a04", className: "text-yellow-600" },
    { label: "🟣", color: "#9333ea", className: "text-purple-600" },
];

// Type-safe extension checking
export const isEditorExtension = (ext: string): ext is EditorExtension => {
    return ['bold', 'italic', 'underline', 'fontSize', 'alignment', 'clearFormat', 'color'].includes(ext);
}; 