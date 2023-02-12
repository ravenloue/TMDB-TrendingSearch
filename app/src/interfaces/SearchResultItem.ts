import { Movie } from "./Movie";
import { TVShow } from "./TVShow";
import { Person } from "./Person";

export interface SearchResultItem extends Movie, TVShow, Person {

    adult: boolean;
    id: number;
    media_type: string;
    popularity: number;
    name_trunc: string;
}