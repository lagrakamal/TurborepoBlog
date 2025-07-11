import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import { FontSize } from "./extensions/FontSize";
import { Color } from "./extensions/Color";

// Configuration constants for better maintainability
export const EDITOR_CONFIG = {
    DEFAULT_PLACEHOLDER: "Write something...",
    DEFAULT_MIN_HEIGHT: "min-h-40",
    TEXT_ALIGN_TYPES: ["heading", "paragraph"] as const,
    TEXT_ALIGN_OPTIONS: ['left', 'center', 'right'] as const,
    DISABLED_EXTENSIONS: [] as const, // Don't disable any extensions for now
} as const;

// Server Component for Editor Configuration
export function getEditorExtensions() {
    return [
        StarterKit.configure({
            heading: {}, // Enable heading for text alignment
            bold: {},
            italic: {},
        }),
        Underline,
        TextStyle,
        FontSize.configure({
            types: ['textStyle'],
        }),
        Color.configure({
            types: ['textStyle'],
        }),
        TextAlign.configure({
            types: [...EDITOR_CONFIG.TEXT_ALIGN_TYPES],
            alignments: [...EDITOR_CONFIG.TEXT_ALIGN_OPTIONS],
        }),
    ];
}

// Server Component for Editor Props
export function getEditorProps(placeholder: string = EDITOR_CONFIG.DEFAULT_PLACEHOLDER) {
    return {
        attributes: {
            class: "w-full rounded-md border bg-background px-3 py-2 text-base shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring/50 transition-colors min-h-40",
            placeholder,
        },
    };
} 