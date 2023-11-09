"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";
import Navbar from "../app/components/navbar/Navbar";

const Provider = ({ children }: { children: ReactNode }) => {
	const client = new QueryClient();
	return (
		<QueryClientProvider client={client}>
			<ReactQueryDevtools initialIsOpen />
			<Navbar />
			{children}
		</QueryClientProvider>
	);
};

export default Provider;
