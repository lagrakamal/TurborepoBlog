import { Mark, mergeAttributes } from '@tiptap/core';

// Configuration constants for Color extension
const COLOR_CONFIG = {
    DEFAULT_TAG: 'span',
    STYLE_PROPERTY: 'color',
    HTML_SELECTOR: 'span[style*="color"]',
} as const;

export interface ColorOptions {
    types: string[];
    HTMLAttributes: Record<string, string>;
}

// Type-safe command declarations
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        color: {
            setColor: (color: string) => ReturnType;
            unsetColor: () => ReturnType;
        };
    }
}

export const Color = Mark.create<ColorOptions>({
    name: 'color',

    addOptions() {
        return {
            types: ['textStyle'],
            HTMLAttributes: {},
        };
    },

    addAttributes() {
        return {
            color: {
                default: null,
                parseHTML: element => {
                    const elementStyle = (element as HTMLElement).style;
                    return elementStyle.color || null;
                },
                renderHTML: attributes => {
                    if (!attributes.color) {
                        return {};
                    }
                    return mergeAttributes(this.options.HTMLAttributes, {
                        style: `${COLOR_CONFIG.STYLE_PROPERTY}: ${attributes.color}`,
                    });
                },
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: COLOR_CONFIG.HTML_SELECTOR,
                getAttrs: element => {
                    const color = (element as HTMLElement).style.color;
                    return color ? { color } : false;
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            COLOR_CONFIG.DEFAULT_TAG,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
            0
        ];
    },

    addCommands() {
        return {
            setColor: color => ({ commands }) => {
                return commands.setMark('color', { color });
            },
            unsetColor: () => ({ commands }) => {
                return commands.unsetMark('color');
            },
        };
    },
}); 