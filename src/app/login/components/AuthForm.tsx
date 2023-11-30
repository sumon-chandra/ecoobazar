"use client";
import { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { cn } from "@/src/lib/utils";
import Spinner from "../../components/loaders/Spinner";

const formSchema = z.object({
	name: z.string(),
	email: z.string(),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters!",
	}),
});

const AuthForm = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [variant, setVariant] = useState<"LOGIN" | "REGISTER">("LOGIN");
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const toggleVariant = useCallback(() => {
		if (variant === "LOGIN") {
			setVariant("REGISTER");
		} else {
			setVariant("LOGIN");
		}
	}, [variant]);

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true);

		if (variant === "REGISTER") {
			const user = { ...values, role: "USER" };
			axios.post("/api/register", user)
				.then(response => {
					if (response.statusText === "OK") {
						toast.success("Register successfully");
					} else {
						toast.error("Something went wrong!!");
					}
					form.reset();
				})
				.catch(err => {
					console.log(err.massage);
					toast.error("Registrations failed");
					setIsLoading(false);
				})
				.finally(() => setIsLoading(false));
		}

		if (variant === "LOGIN") {
			const response = await signIn("credentials", { redirect: false, ...values });
			if (!response?.ok || response.error) {
				toast.error(response?.error);
				setIsLoading(false);
			} else {
				toast.success("Login successful!!");
				form.reset();
			}
		}
	}

	async function handleSocialLogin() {
		setIsLoading(true);
		const response = await signIn("google", { redirect: false });
		console.log(response);
		if (!response?.ok && (response?.error !== "" || undefined)) {
			setIsLoading(false);
		} else {
			setIsLoading(false);
			toast.success("Login successful!!");
			router.push("/");
		}
	}

	return (
		<div className="bg-white px-6 py-10 flex-1 md:flex-none lg:w-[400px] rounded-lg shadow-primary shadow z-10">
			<h3 className="text-center text-xl font-bold leading-6">{variant === "REGISTER" ? "Register" : "Login"}</h3>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 ">
					{variant === "REGISTER" && (
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="Write your name" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
					)}
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="Write your email" type="email" {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input placeholder="Write your password" type="password" {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<Button
						disabled={isLoading}
						variant="primary"
						type="submit"
						className="text-white font-semibold active:scale-95 transition-all"
					>
						{variant === "REGISTER" ? "Register" : "Login"}
					</Button>
				</form>
				<div className="text-sm mt-2 flex items-center justify-center gap-2">
					<div>{variant === "LOGIN" ? "Don't have an account?" : "Already have an account?"}</div>
					<div
						className="underline underline-offset-2 font-semibold text-primary cursor-pointer"
						onClick={toggleVariant}
					>
						{variant === "LOGIN" ? "Register" : "Login"}
					</div>
				</div>
				<div
					onClick={handleSocialLogin}
					className={cn(
						"bg-green-100 mt-6 border-2 border-primary py-2 flex items-center justify-center rounded-md cursor-pointer active:scale-95 transition-all",
						isLoading && "opacity-60 pointer-events-none cursor-not-allowed"
					)}
				>
					<div className="flex items-center justify-center gap-4">
						{isLoading && <Spinner />}
						<div>
							<FcGoogle size={20} />
						</div>
						<div>Continue with Google</div>
					</div>
				</div>
			</Form>
		</div>
	);
};

export default AuthForm;
