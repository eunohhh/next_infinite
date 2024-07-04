import { Database } from "./supabase";

export interface QueryResult {
    pages: Place[][];
    pageParams: number[];
}

export type Place = Database["public"]["Tables"]["Places"]["Row"];
