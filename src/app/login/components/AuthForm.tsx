"use client";
import { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import axios from "axios";
import { useToast } from "@/src/components/ui/use-toast";
import { Toaster } from "@/src/components/ui/toaster";

const formSchema = z.object({
	name: z.string(),
	email: z.string(),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters!",
	}),
});

const AuthForm = () => {
	const { toast } = useToast();
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

	function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true);
		axios.post("/api/register", values)
			.then(() => {
				toast({
					variant: "default",
					description: "Registration successful",
				});
				form.reset();
			})
			.catch(err => {
				setIsLoading(false);
				toast({
					variant: "destructive",
					description: err?.response?.data,
				});
			})
			.finally(() => {
				setIsLoading(false);
			});
	}

	return (
		<div className="relative">
			<Toaster />
			<div className="bg-white p-4 rounded-lg shadow-xl">
				<h3 className="text-center font-bold leading-6">Register</h3>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-6 "
					>
						{variant === "REGISTER" && (
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Name
										</FormLabel>
										<FormControl>
											<Input
												placeholder="Write your name"
												{...field}
											/>
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
										<Input
											placeholder="Write your email"
											type="email"
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Password
									</FormLabel>
									<FormControl>
										<Input
											placeholder="Write your password"
											type="password"
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<Button
							disabled={isLoading}
							variant="primary"
							type="submit"
							className="text-white font-semibold"
						>
							{variant === "REGISTER" ? "Register" : "Login"}
						</Button>
					</form>
					<div className="text-sm mt-2 flex items-center justify-center gap-2">
						<div>
							{variant === "LOGIN"
								? "Don't have an account?"
								: "Already have an account?"}
						</div>
						<div
							className="underline underline-offset-2 font-semibold text-primary cursor-pointer"
							onClick={toggleVariant}
						>
							{variant === "LOGIN" ? "Register" : "Login"}
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default AuthForm;
