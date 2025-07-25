export type CommentEntity = {
    id: number;
    content: string;
    post: Post;
    author: User;
    createdAt: Date;
    updatedAt: Date;
};

export type CreateCommentFormState = {
    data?: {
        content?: string;
        postId?: number;
    };
    errors?: {
        content?: string[];
    };
    message?: string;
    ok?: boolean;
    open?: boolean;
};

// Shared types needed for Comment
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