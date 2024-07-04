import createClientOnServer from "@/supabase/supabaseServer";
import { redirect } from "next/navigation";

const signOut = async () => {
    "use server";

    const supabase = createClientOnServer();

    const { error } = await supabase.auth.signOut();

    if (error) {
        return redirect("/login");
    }

    return redirect("/login");
};

export default signOut;