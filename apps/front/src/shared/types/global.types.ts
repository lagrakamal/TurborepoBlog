// Global types shared across multiple features
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