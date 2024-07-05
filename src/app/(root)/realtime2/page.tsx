import getUserServer from "../_lib/getUserServer";

async function RealTimeTwoPage() {
    const { user } = await getUserServer();

    // console.log(user);

    return (
        <div>
            <h1>RealTimeTwoPage</h1>
        </div>
    );
}

export default RealTimeTwoPage;
