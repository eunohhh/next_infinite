import LoginForm from "./_components/LoginForm";

function LogInPage() {
    // const { mutate, isPending, data, error, isError } = useMutation({
    //     mutationFn: (payload: LoginPayLoad) => loginWithEmail(payload),
    // });

    // useEffect(() => {
    //     if (isError) {
    //         console.error(error);
    //         alert(error.message);
    //         router.replace("/login");
    //     }

    //     if (data) router.replace("/");
    // }, [isError, data, error, router]);

    return (
        <div className="w-full h-[600px] flex justify-center items-center">
            <LoginForm />
        </div>
    );
}

export default LogInPage;
