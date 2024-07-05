import signOut from "../_lib/signOut";
import { SubmitButton } from "./SubmitButton";

function LogOutButton() {
    return (
        <form>
            <SubmitButton
                formAction={signOut}
                className="bg-red-500 text-white rounded-md px-4 py-2 text-foreground mb-2"
                pendingText="Sign Out..."
            >
                로그아웃
            </SubmitButton>
        </form>
    );
}

export default LogOutButton;
