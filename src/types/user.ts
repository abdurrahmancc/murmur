export interface LoginUserType {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string | null;
    coverPhotoUrl?: string | null;
    bio?: string | null;
    phoneNumber?: string | null;
    createdAt: Date;
    updatedAt: Date;
    following:[any];
    followers:[any];
    murmurs:[any]
}
