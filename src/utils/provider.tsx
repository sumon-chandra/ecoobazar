"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";
import { Toaster } from "../components/ui/toaster";

const Provider = ({ children }: { children: ReactNode }) => {
	const client = new QueryClient();
	return (
		<QueryClientProvider client={client}>
			<ReactQueryDevtools initialIsOpen />
			{children}
		</QueryClientProvider>
	);
};

export default Provider;
