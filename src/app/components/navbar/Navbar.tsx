"use client";

import Image from "next/image";
import { navRoutes } from "../../primitives";
import NavItem from "./NavItem";
import { Button } from "@/src/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
	const { data } = useSession();
	const router = useRouter();
	const handleLogout = () => {
		signOut({ redirect: false });
		router.push("/login");
	};

	return (
		<div className="border-b border-primary w-full px-2 py-3 bg-white z-[999]">
			<nav className="max-w-7xl mx-auto flex items-center justify-between">
				<Link href="/" className="flex items-center justify-start gap-2 cursor-pointer select-none">
					<figure>
						<Image width="30" height="30" alt="Logo image" src="/logo.png" />
					</figure>
					<div className="font-bold text-title-hard text-2xl">Ecoobazar</div>
				</Link>
				<div className="flex items-center gap-2 justify-center">
					{navRoutes.map(route => (
						<NavItem key={route.id} label={route.label} href={route.href} />
					))}
				</div>
				<div>
					{data?.user?.email ? (
						<Button onClick={handleLogout} variant="primary">
							Logout
						</Button>
					) : (
						<Link href="/login">
							<Button variant="primary">Login</Button>
						</Link>
					)}
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
