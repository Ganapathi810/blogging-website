"use client"

import { SidebarMenuAction, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"
import { Ellipsis, Link, Pencil, Trash } from "lucide-react"
import { DropdownMenu } from "./tiptap-ui-primitive/dropdown-menu"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Blog } from "@/generated/prisma"

export const UserBlogsInSidebar =  ({ allBlogsOfUser } : { allBlogsOfUser : Blog[]}) => {
    

    return (
        <>
            {allBlogsOfUser.length === 0 ? (
                <SidebarMenuItem className="flex justify-center mt-2 text-sm">no blogs</SidebarMenuItem>
            ) : (
                <div className="mt-1">
                    {allBlogsOfUser.map((blog) => (
                        <SidebarMenuItem key={blog.id}>
                            <SidebarMenuButton  variant='outline' className="hover:bg-green-500/10 active:bg-green-500/20">
                                <Link href={`/blogs/${encodeURIComponent(blog.slug)}`} className="hover:truncate hover:w-48">
                                    <span className="text-nowrap w-48 truncate inline-block">{blog.title}</span>
                                </Link>
                            </SidebarMenuButton>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuAction className="hover:bg-green-400 cursor-pointer" showOnHover>
                                        <Ellipsis />
                                    </SidebarMenuAction>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="border border-green-200 shadow-sm shadow-gray-300 w-26 relative rounded-md z-40 bg-white p-2 flex flex-col gap-1" sideOffset={5} align="start">
                                    <DropdownMenuItem asChild>
                                        <Link href={`/blogs/${encodeURIComponent(blog.slug)}/edit`} className="group rounded-md group hover:bg-green-400/20 p-1 text-center flex justify-between items-center">
                                            <Pencil className="group-hover:stroke-green-400 size-5"/>
                                            <span className="text-black mr-3">Edit</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => {}} className="rounded-md group hover:bg-red-400/20 p-1 text-center flex justify-between items-center cursor-pointer">
                                        <Trash className="stroke-red-500 size-5"/>
                                        <span className="text-red-500 ">Delete</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    ))}
                </div>
            )}
        </>
    )
}