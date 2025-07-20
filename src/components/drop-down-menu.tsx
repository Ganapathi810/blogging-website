"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LogOut } from "lucide-react";
import Link from "next/link";
import { logout } from "@/lib/actions/logout";
import { useUser } from "@/hooks/use-user-data";


export default function DropDownMenu() {
    const { user }  = useUser()
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className='size-8 hover:ring-4 hover:ring-green-400/40 mt-1'>
                    <AvatarImage src={user?.image ?? undefined} />
                    <AvatarFallback>
                        <div className='bg-green-300/50 size-8 animate-pulse rounded-full'></div>
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2">
                <DropdownMenuLabel><span className="font-semibold text-wrap">{user?.name}</span></DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-green-200"/>
                <DropdownMenuItem asChild>
                    <Link href={`/author/${user?.id}/profile/`} className="flex items-center gap-2" >
                        <span className="text-green-500">View your profile page</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => logout()} >
                    <LogOut />
                    <span>log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )

}