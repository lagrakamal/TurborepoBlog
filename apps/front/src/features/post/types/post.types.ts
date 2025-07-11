export type Post = {
    id: number;
    title: string;
    slug: string;
    author: User;
    content: string;
    thumbnail: string | null;
    published: boolean;
    authorId: number;
    tags: Tag[];
    createdAt: Date;
    updatedAt: Date;

    _count: {
        likes: number;
        comments: number;
    };
};

export type PostFormState = {
    data?: {
        postId?: number;
        title?: string;
        content?: string;
        thumbnail?: File | null;
        tags?: string;
        published?: string;
        previousThumbnailUrl?: string;
    };

    errors?: {
        title?: string[];
        content?: string[];
        thumbnail?: string[];
        tags?: string[];
        published?: string[];
    };

    message?: string;
    ok?: boolean;
};

// Shared types needed for Post
export type User = {
    name: string;
    id: number;
    email: string;
    bio: string | null;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
};

export type Tag = {
    id: number;
    name: string;
}; 