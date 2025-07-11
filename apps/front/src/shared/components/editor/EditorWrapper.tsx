import { Suspense } from 'react';
import { RichTextEditor } from './RichTextEditor';
import { RichTextEditorProps } from './types/editor.types';

// Server Component Wrapper
export function EditorWrapper(props: RichTextEditorProps) {
    return (
        <Suspense fallback={<EditorSkeleton />}>
            <RichTextEditor
                {...props}
            />
        </Suspense>
    );
}

// Server Component Skeleton
function EditorSkeleton() {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-1 border-b pb-2 mb-2 bg-muted/40 rounded-t-md px-2 h-10 animate-pulse" />
            <div className="w-full rounded-md border bg-background px-3 py-2 min-h-40 animate-pulse" />
        </div>
    );
} 