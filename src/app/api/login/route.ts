import { emailRegex } from "@/app/utils/emailRegex";
import createClientOnServer from "@/supabase/supabaseServer";
import { LoginPayLoad } from "@/types/typs";

export async function POST(request: Request) {
    const { email, password }: LoginPayLoad = await request.json();

    const supabase = createClientOnServer();

    if (!email || !password) return new Response(JSON.stringify({ error: 'Email and password are required' }), { status: 400 });    

    if (/\s/.test(email) || /\s/.test(password)) {
        return new Response(JSON.stringify({ error: 'Email and password cannot contain whitespace' }), { status: 400 });
    }

    if (!emailRegex.test(email)) 
        return new Response(JSON.stringify({ error: 'Invalid email format' }), { status: 400 });
    

    if (password.length < 4 || password.length > 15) 
        return new Response(JSON.stringify({ error: 'Password must be between 4 and 15 characters long' }), { status: 400 });
    

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error(error);
        return new Response(JSON.stringify(error), { status: 500 });
    }
    return new Response(JSON.stringify(data));
}