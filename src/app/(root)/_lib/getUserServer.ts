import createClientOnServer from "@/supabase/supabaseServer";
import { redirect } from "next/navigation";

async function getUserServer() {
    const supabase = createClientOnServer();

    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        redirect("/login");
    }

    return data
}

export default getUserServer;
