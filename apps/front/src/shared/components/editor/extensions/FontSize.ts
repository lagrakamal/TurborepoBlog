import { Mark, mergeAttributes } from '@tiptap/core';

// Configuration constants for FontSize extension
const FONT_SIZE_CONFIG = {
    DEFAULT_TAG: 'span',
    STYLE_PROPERTY: 'font-size',
    HTML_SELECTOR: 'span[style*="font-size"]',
    KEYBOARD_SHORTCUTS: {
        SMALL: 'Mod-Shift-1',
        MEDIUM: 'Mod-Shift-2',
        LARGE: 'Mod-Shift-3',
    },
    FONT_SIZES: {
        SMALL: '1rem',
        MEDIUM: '1.5rem',
        LARGE: '2rem',
    },
} as const;

export interface FontSizeOptions {
    types: string[];
    HTMLAttributes: Record<string, string>;
}

// Type-safe command declarations
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fontSize: {
            setFontSize: (size: string) => ReturnType;
            unsetFontSize: () => ReturnType;
        };
    }
}

export const FontSize = Mark.create<FontSizeOptions>({
    name: 'fontSize',

    addOptions() {
        return {
            types: ['textStyle'],
            HTMLAttributes: {},
        };
    },

    addAttributes() {
        return {
            fontSize: {
                default: null,
                parseHTML: element => {
                    const elementStyle = (element as HTMLElement).style;
                    return elementStyle.fontSize || null;
                },
                renderHTML: attributes => {
                    if (!attributes.fontSize) {
                        return {};
                    }
                    return mergeAttributes(this.options.HTMLAttributes, {
                        style: `${FONT_SIZE_CONFIG.STYLE_PROPERTY}: ${attributes.fontSize}`,
                    });
                },
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: FONT_SIZE_CONFIG.HTML_SELECTOR,
                getAttrs: element => {
                    const fontSize = (element as HTMLElement).style.fontSize;
                    return fontSize ? { fontSize } : false;
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            FONT_SIZE_CONFIG.DEFAULT_TAG,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
            0
        ];
    },

    addCommands() {
        return {
            setFontSize: size => ({ commands }) => {
                return commands.setMark('fontSize', { fontSize: size });
            },
            unsetFontSize: () => ({ commands }) => {
                return commands.unsetMark('fontSize');
            },
        };
    },

    addKeyboardShortcuts() {
        return {
            [FONT_SIZE_CONFIG.KEYBOARD_SHORTCUTS.SMALL]: () =>
                this.editor.commands.setFontSize(FONT_SIZE_CONFIG.FONT_SIZES.SMALL),
            [FONT_SIZE_CONFIG.KEYBOARD_SHORTCUTS.MEDIUM]: () =>
                this.editor.commands.setFontSize(FONT_SIZE_CONFIG.FONT_SIZES.MEDIUM),
            [FONT_SIZE_CONFIG.KEYBOARD_SHORTCUTS.LARGE]: () =>
                this.editor.commands.setFontSize(FONT_SIZE_CONFIG.FONT_SIZES.LARGE),
        };
    },
}); 