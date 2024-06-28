import supabaseClient from "@/supabase/supabaseClient";
import { Place } from "@/types/supabase";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const request: { start: number } = await req.json();

    const { start } = request;

    const { data, error }: { data: Place[]; error: any } = await supabaseClient
        .from("Places")
        .select("*")
        .order("created_at", { ascending: false }) // 생성일 내림차순으로 정렬
        .range(start, start + 4); // 데이터 범위 설정

    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }

    return new Response(JSON.stringify(data));
}
