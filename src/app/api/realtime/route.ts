import createClientOnServer from "@/supabase/supabaseServer";
import { RealTime } from "@/types/typs";
import { QueryError } from "@supabase/supabase-js";

export async function GET() {
    const supabase = createClientOnServer();    

    const { data : realtimeone, error } : {data: RealTime[]; error: QueryError} = await supabase.from("realtimeone").select("*");

    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }

    return new Response(JSON.stringify(realtimeone));
}


export async function POST(request: Request) {
    const { title } = await request.json();

    const supabase = createClientOnServer();

    const { data, error } = await supabase.from("realtimeone").insert({ title }).select();

    if (error) {
        console.log(error);
        return new Response(JSON.stringify(error), { status: 500 });
    }
    return new Response(JSON.stringify(data));
}