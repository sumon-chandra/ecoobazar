import AuthForm from "./components/AuthForm";

const LoginPage = () => {
	return (
		<main className="h-screen w-full">
			<section className="flex h-full w-full items-center p-4 justify-center">
				<AuthForm />
			</section>
		</main>
	);
};

export default LoginPage;
