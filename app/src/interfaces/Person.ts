import { SearchResultItem } from "./SearchResultItem";

export interface Person {

    name: string;
    original_name: string;
    gender: number;
    known_for_department: string;
    profile_path: string;
    known_for?: SearchResultItem[];
    biography: string;

}