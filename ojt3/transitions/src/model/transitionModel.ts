export default interface TransitionsMode {
    id: string;
    name: string;
    city: string;
    country: string;
    street: string;
    zip_code: string;
    profile_picture_id?: string
}

export type TransitionsWithNoId = Omit<TransitionsMode, "id">