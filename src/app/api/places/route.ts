import supabase from "@/supabase/supabaseServer";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const request: { start: number; end: number } = await req.json();

    const { start, end } = request;

    const { data, error } = await supabase
        .from("Places")
        .select("*")
        .order("created_at", { ascending: false }) // 생성일 내림차순으로 정렬
        .range(start, end); // 데이터 범위 설정

    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }

    return new Response(JSON.stringify(data));
}
