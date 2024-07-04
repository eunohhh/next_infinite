import { ITEMS_PER_PAGE } from "@/constants/constants";
import supabaseClient from "@/supabase/supabaseClient";
import { Place } from "@/types/typs";
import { QueryError } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url);

    const pageString = searchParams.get("page");

    if(pageString) {
        const page = Number(pageString);
        const start = page * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE - 1;

        const { data, error }: { data: Place[]; error: QueryError } = await supabaseClient
            .from("Places")
            .select("*")
            .order("created_at", { ascending: false }) // 생성일 내림차순으로 정렬
            .range(start, end); // 데이터 범위 설정

        if (error) {
            return new Response(JSON.stringify(error), { status: 500 });
        }

        return new Response(JSON.stringify(data));
    }

    const { data, error }: { data: Place[]; error: QueryError } = await supabaseClient
        .from("Places")
        .select("*")
        .order("created_at", { ascending: false }); // 생성일 내림차순으로 정렬

    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }

    return new Response(JSON.stringify(data));
}

// export async function POST(req: NextRequest) {
//     const request: { page: number } = await req.json();

//     const { page } = request;

//     const start = page * ITEMS_PER_PAGE;
//     const end = start + ITEMS_PER_PAGE - 1;

//     const { data, error }: { data: Place[]; error: QueryError } = await supabaseClient
//         .from("Places")
//         .select("*")
//         .order("created_at", { ascending: false }) // 생성일 내림차순으로 정렬
//         .range(start, end); // 데이터 범위 설정

//     if (error) {
//         return new Response(JSON.stringify(error), { status: 500 });
//     }

//     return new Response(JSON.stringify(data));
// }
