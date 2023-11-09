"use client";

import { FC } from "react";

interface NavItemProps {
	label: string;
	href: string;
}

const NavItem: FC<NavItemProps> = ({ href, label }) => {
	return (
		<div className="p-2 font-bold text-xl text-primary">
			<div>{label}</div>
		</div>
	);
};

export default NavItem;
