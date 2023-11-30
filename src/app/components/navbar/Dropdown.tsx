"use client"
import { Button } from "@/src/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import Link from "next/link";
import { CiUser } from "react-icons/ci";
import { IoLogOutOutline, IoLogInOutline, IoSettingsOutline } from "react-icons/io5";


const Dropdown = () => {
    const { data } = useSession();
    const router = useRouter();
    const handleLogout = () => {
        signOut({ redirect: false });
        router.push("/login");
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="bg-primary cursor-pointer text-white p-4 flex items-center justify-center rounded-full">
                    <CiUser size={20} />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <div className="w-full flex items-center justify-center gap-4">
                        <IoSettingsOutline />
                        <div>Setting</div>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    {data?.user?.email ? (
                        <div onClick={handleLogout} className="w-full flex items-center justify-center gap-4">
                            <IoLogInOutline />
                            <div>Logout</div>
                        </div>
                    ) : (
                        <Link href="/login">
                            <div className="w-full flex items-center justify-center gap-4">
                                <IoLogOutOutline />
                                <div>Login</div>
                            </div>
                        </Link>
                    )}
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Dropdown
