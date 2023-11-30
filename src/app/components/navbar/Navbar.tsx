"use client";

import Image from "next/image";
import Link from "next/link";
import SearchInput from "./SearchInput";
import Dropdown from "./Dropdown";

const Navbar = () => {


	return (
		<div className="border-b w-screen relative border-primary w-full px-2 py-3 bg-white z-[999]">
			<div className="lg:w-full-width mx-auto">
				<nav className="flex items-center justify-between">
					<div className="flex-1">
						<Link href="/" className="cursor-pointer flex items-center justify-start gap-2 select-none">
							<figure>
								<Image width="10" height="10" alt="Logo image" src="/logo.png" className="lg:w-[30px]" />
							</figure>
							<div className="font-bold text-title-hard text-sm lg:text-2xl">Ecoobazar</div>
						</Link>
					</div>
					<div className="flex flex-1 items-center lg:justify-between justify-end gap-3">
						<SearchInput />
						<Dropdown />
					</div>
				</nav>
			</div>
		</div>
	);
};

export default Navbar;
