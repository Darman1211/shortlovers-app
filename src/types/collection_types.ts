import { DirectusUser } from "./directus_types.js";

export type Drama = {
    id: number;
    status: string;
    user_created?: string | DirectusUser | null;
    date_created?: string | null;
    user_updated?: string | DirectusUser | null;
    date_updated?: string | null;
    title: string;
    synopsis?: string | null;
    cover_link?: string | null;
    is_featured: boolean;
    cover: string | null;
    episodes?: any | null;
    genres?: any | null;
    category?: any | null;
}