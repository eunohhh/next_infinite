import { Place } from "./supabase";

export interface QueryResult {
    pages: Place[][];
    pageParams: number[];
}
