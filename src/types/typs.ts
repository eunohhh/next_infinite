import { Database, Tables } from "./supabase";

export interface QueryResult {
    pages: Place[][];
    pageParams: number[];
}

export type Place = Database["public"]["Tables"]["Places"]["Row"];

export type Deal = Tables<"deals">;

export type RealTime = Tables<"realtimeone">;

export type LoginPayLoad = {
    email: string;
    password: string;
}

export type Message = {
    [key: string]: any;
    type: "broadcast" | "presence" | "postgres_changes";
    event: string;
};
