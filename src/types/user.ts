export interface LoginUserType {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string | null;
    bio?: string | null;
    phoneNumber?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
