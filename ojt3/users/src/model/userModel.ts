export default interface UserMode {
    id: string;
    name: string;
    city: string;
    country: string;
    street: string;
    zip_code: string;
    profile_picture_id?: string
}

export type UserWithNoId = Omit<UserMode, "id">