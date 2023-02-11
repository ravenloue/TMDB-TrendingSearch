import { SearchResultItem } from "./SearchResultItem";

export interface MovieDBObject {
    page: number;
    results: SearchResultItem[];
    total_pages: number;
    total_results: number;
}