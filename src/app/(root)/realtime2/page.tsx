import getUserServer from "../_lib/getUserServer";
import RealTimeTwoPost from "./_components/RealTimeTwoPost";

async function RealTimeTwoPage() {
    const { user } = await getUserServer();

    // console.log(user);

    return (
        <div>
            <RealTimeTwoPost user={user} />
        </div>
    );
}

export default RealTimeTwoPage;
