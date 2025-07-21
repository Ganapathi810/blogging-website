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
import { Loader2, LogOut } from "lucide-react";
import Link from "next/link";
import { logout } from "@/lib/actions/logout";
import { useUser } from "@/hooks/use-user-data";
import { useAlertInfoContext } from "@/contexts/alert-info-context";
import { useState } from "react";


export default function DropDownMenu() {
    const { user }  = useUser()
    const [isLoggingOut,setIsLoggingOut] = useState(false);
    const { setAlertInfo } = useAlertInfoContext()


    const handleLogout = async () => {
        setIsLoggingOut(true)
        try {
            await logout()
        } catch (error) {
            console.log("Failed to logout : "+error)
            setIsLoggingOut(false)
            setAlertInfo({ status : 'error', message : "Failed to logout, try again"})
        }
    }
    
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
                <DropdownMenuItem onClick={handleLogout} disabled={isLoggingOut} >
                    {isLoggingOut ? <Loader2 className="h-4 w-4 animate-spin mr-1 fill-green-500"/> : <LogOut className="mr-1"/>}
                    <span>{isLoggingOut ? "logging out..." : "logout"}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )

}