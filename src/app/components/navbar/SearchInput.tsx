"use client";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { CiSearch } from "react-icons/ci";

const SearchInput = () => {
	return (
		<>
			<div className="hidden lg:w-[410px] flex-1 md:flex-none border rounded lg:flex items-center justify-between">
				<div className="flex items-center justify-start flex-grow px-4">
					<CiSearch size={20} />
					<Input
						type="text"
						className="text-gray-500 focus:outline-none ring-0 border-0 focus-visible:ring-0 focus-visible:border-0"
						placeholder="Search"
					/>
				</div>
				<Button className="text-xs font-semibold rounded-none px-6 py-4 rounded-r h-auto">Search</Button>
			</div>
			<div className="lg:hidden bg-primary cursor-pointer bg-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white text-primary p-4 flex items-center justify-center rounded-full">
				<CiSearch size={20} />
			</div>
		</>
	);
};

export default SearchInput;
