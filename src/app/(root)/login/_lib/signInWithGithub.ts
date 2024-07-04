import createClientOnServer from "@/supabase/supabaseServer";
import { redirect } from "next/navigation";

async function signInWithGithub() {
    "use server";
    const supabase = createClientOnServer();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options:{
            redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`
        }
    });

    if (error) {
        return redirect("/login");
    }

    return redirect(data.url);
}

export default signInWithGithub;