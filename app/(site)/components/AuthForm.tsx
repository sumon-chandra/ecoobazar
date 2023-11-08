"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";

const formSchema = z.object({
	name: z.string(),
	email: z.string(),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters!",
	}),
});

const AuthForm = () => {
	const [isError, setIsError] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			axios.post("/api/register", values);
		} catch (error: any) {
			setIsError(true);
		} finally {
			setIsError(false);
		}
	}

	return (
		<>
			{isError && (
				<div className="mb-4 flex items-center justify-start bg-danger p-3 rounded-lg gap-5">
					<AlertTriangle className="text-white" />
					<p className="text-white text-sm">Something went wrong!</p>
				</div>
			)}
			<div className="bg-white p-4 rounded-lg shadow-xl">
				<h3 className="text-center font-bold leading-6">Register</h3>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-6 "
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											placeholder="Write your name"
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
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
						<Button variant="primary" type="submit">
							Register
						</Button>
					</form>
				</Form>
			</div>
		</>
	);
};

export default AuthForm;
