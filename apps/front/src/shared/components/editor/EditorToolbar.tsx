"use client";
import { Button } from "@/shared/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/tooltip";
import { cn } from "@/shared/lib/utils";
import {
    FaBold,
    FaItalic,
    FaUnderline,
    FaAlignLeft,
    FaAlignCenter,
    FaAlignRight,
    FaEraser,
    FaPalette
} from "react-icons/fa";
import {
    EditorToolbarProps,
    FONT_SIZES,
    COLOR_OPTIONS,
    BUTTON_SIZE_CLASS,
    ICON_SIZE_CLASS,
    isEditorExtension
} from "./types/editor.types";
import { useMemo } from "react";

// Reusable toolbar button component
interface ToolbarButtonProps {
    editor: EditorToolbarProps['editor'];
    isActive: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    tooltip: string;
    className?: string;
}

function ToolbarButton({ editor, isActive, onClick, icon, tooltip, className }: ToolbarButtonProps) {
    if (!editor) return null;

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    type="button"
                    size="icon"
                    variant={isActive ? "default" : "ghost"}
                    onClick={onClick}
                    className={cn(BUTTON_SIZE_CLASS, className)}
                >
                    {icon}
                </Button>
            </TooltipTrigger>
            <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
    );
}

export function EditorToolbar({ editor, extensions = [] }: EditorToolbarProps) {
    // Memoized extension checking for better performance
    const hasExtension = useMemo(() => {
        return (ext: string) => {
            if (!isEditorExtension(ext)) return false;
            return extensions.includes(ext);
        };
    }, [extensions]);

    if (!editor) return null;

    // Get current alignment value directly
    const getAlignmentValue = () => {
        if (editor.isActive({ textAlign: "left" })) return "left";
        if (editor.isActive({ textAlign: "center" })) return "center";
        if (editor.isActive({ textAlign: "right" })) return "right";
        return "left";
    };

    return (
        <TooltipProvider>
            <div className="flex flex-wrap items-center gap-1 border-b pb-2 mb-2 bg-muted/40 rounded-t-md px-2">
                {/* Text Formatting */}
                {hasExtension('bold') && (
                    <ToolbarButton
                        editor={editor}
                        isActive={editor.isActive("bold")}
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        icon={<FaBold className={ICON_SIZE_CLASS} />}
                        tooltip="Bold"
                    />
                )}

                {hasExtension('italic') && (
                    <ToolbarButton
                        editor={editor}
                        isActive={editor.isActive("italic")}
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        icon={<FaItalic className={ICON_SIZE_CLASS} />}
                        tooltip="Italic"
                    />
                )}

                {hasExtension('underline') && (
                    <ToolbarButton
                        editor={editor}
                        isActive={editor.isActive("underline")}
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        icon={<FaUnderline className={ICON_SIZE_CLASS} />}
                        tooltip="Underline"
                    />
                )}

                {/* Font Size */}
                {hasExtension('fontSize') && (
                    <div className="flex items-center gap-1">
                        {FONT_SIZES.map(({ label, size, className }) => (
                            <ToolbarButton
                                key={size ?? "normal"}
                                editor={editor}
                                isActive={editor.isActive("fontSize", { fontSize: size })}
                                onClick={() => {
                                    if (size) {
                                        editor.chain().focus().setFontSize(size).run();
                                    } else {
                                        editor.chain().focus().unsetFontSize().run();
                                    }
                                }}
                                icon={<span className={className}>{label}</span>}
                                tooltip={size ? `Font size ${size}` : "Normal font size"}
                                className={className}
                            />
                        ))}
                    </div>
                )}

                {/* Text Color */}
                {hasExtension('color') && (
                    <div className="flex items-center gap-1">
                        <ToolbarButton
                            editor={editor}
                            isActive={false}
                            onClick={() => editor.chain().focus().unsetMark('color').run()}
                            icon={<FaPalette className={ICON_SIZE_CLASS} />}
                            tooltip="Reset color"
                        />
                        {COLOR_OPTIONS.map(({ label, color, className }) => (
                            <ToolbarButton
                                key={color}
                                editor={editor}
                                isActive={editor.isActive("color", { color })}
                                onClick={() => editor.chain().focus().setColor(color).run()}
                                icon={<span className={className}>{label}</span>}
                                tooltip={`Color ${color}`}
                                className={className}
                            />
                        ))}
                    </div>
                )}

                {/* Text Alignment */}
                {hasExtension('alignment') && (
                    <ToggleGroup
                        type="single"
                        value={getAlignmentValue()}
                        onValueChange={(value) => {
                            if (value) {
                                editor.chain().focus().setTextAlign(value as 'left' | 'center' | 'right').run();
                            }
                        }}
                    >
                        <ToggleGroupItem value="left" size="sm" className={BUTTON_SIZE_CLASS}>
                            <FaAlignLeft className={ICON_SIZE_CLASS} />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="center" size="sm" className={BUTTON_SIZE_CLASS}>
                            <FaAlignCenter className={ICON_SIZE_CLASS} />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="right" size="sm" className={BUTTON_SIZE_CLASS}>
                            <FaAlignRight className={ICON_SIZE_CLASS} />
                        </ToggleGroupItem>
                    </ToggleGroup>
                )}

                {/* Clear Formatting */}
                {hasExtension('clearFormat') && (
                    <ToolbarButton
                        editor={editor}
                        isActive={false}
                        onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
                        icon={<FaEraser className={ICON_SIZE_CLASS} />}
                        tooltip="Clear formatting"
                    />
                )}
            </div>
        </TooltipProvider>
    );
} 