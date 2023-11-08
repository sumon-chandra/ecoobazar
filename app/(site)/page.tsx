import AuthForm from "./components/AuthForm";

export default function Home() {
	return (
		<main>
			<section className="max-w-xl bg-neutral-100 p-10 mx-auto mt-32">
				<h4>Hello World</h4>
				<AuthForm />
			</section>
		</main>
	);
}
