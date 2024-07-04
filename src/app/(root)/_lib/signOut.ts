import createClientOnServer from "@/supabase/supabaseServer";
import { redirect } from "next/navigation";

const signOut = async () => {
    "use server";

    console.log("asdfsdf")
    const supabase = createClientOnServer();

    const { error } = await supabase.auth.signOut();

    console.log(error)

    if (error) {
        return redirect("/login");
    }

    return redirect("/login");
};

export default signOut;