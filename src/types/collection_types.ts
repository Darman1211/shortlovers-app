import { DirectusUser } from "./directus_types.js";

export type Drama = {
    id: string;
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

export type Categories = {
    id: number;
    date_created?: string | null;
    date_updated?: string | null;
    name: string;
}

export type Genres = {
    id: number;
    date_created?: string | null;
    date_updated?: string | null;
    name: string;
}

export type DramasGenres = {
    id: number;
    date_created?: string | null;
    date_updated?: string | null;
    drama_id: string;
    genre_id: string;
}
export type Episodes = {
    id: string;
    date_created?: string | null;
    date_updated?: string | null;
    drama_id: Drama;
    episode_number: number;
    name: string;
    episode_link: string;
    cover_link?: string | null;
    cover: string | null;
    is_locked?: boolean | null;
    description?: string | null;
    segments?: any | null;
}