export type Movie = {
    poster_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: number[];
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: string;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
}

export type SignInData = {
    token: string;
    userId: number;
    name: string;
}

export type PageResponse<T> = {
    content: T[];
    totalPages: number;
    number: number;
};

type PageInfo = {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
};

export type MoviesPageResponse = {
    content: Movie[]
    page: PageInfo;
};