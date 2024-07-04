import createClientOnServer from "@/supabase/supabaseServer";
import { Deal } from "@/types/typs";
import { QueryError } from "@supabase/supabase-js";

export async function GET() {
    const supabase = createClientOnServer();    

    // const { data : deals, error } : {data: Deal[]; error: QueryError} = await supabase.from("deals").select("*, seller:sellerId (*)");
    const { data : deals, error } : {data: Deal[]; error: QueryError} = await supabase.from("deals").select("*");

    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }

    return new Response(JSON.stringify(deals));
}

export async function POST(request: Request) {
    const { content } = await request.json();

    const supabase = createClientOnServer();

    const { data, error } = await supabase.from("deals").insert({ content }).select();

    if (error) {
        console.log(error);
        return new Response(JSON.stringify(error), { status: 500 });
    }
    return new Response(JSON.stringify(data));
}