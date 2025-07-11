export type SignUpFormState = {
    data: {
        name?: string;
        email?: string;
        password?: string;
    };
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
    };
    message?: string;
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