"use client"

import { Suspense, use, useState } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarSeparator, SidebarTrigger, useSidebar } from "./ui/sidebar";
import { House,Ellipsis,Pencil,Trash,SquarePen,Search } from "lucide-react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import SearchDialog from "./ui/search-dialog";
import { getAllBlogsOfUser } from "@/lib/db/blog";
import { useDeleteBlog } from "@/contexts/delete-blog-context";


type BlogType = Awaited<ReturnType<typeof getAllBlogsOfUser>>[number]


export function AppSidebar({ blogs } : { blogs : Promise<BlogType[]> }) {
    const [openSearchDialog,setOpenSearchDialog] = useState(false)
    const { open,isMobile,openMobile } = useSidebar()
    const { setBlogToDelete } = useDeleteBlog()

    const allBlogsOfUser = use(blogs)
    const isSidebarOpen = isMobile ? openMobile : open


    return (
        <>
            <SearchDialog open={openSearchDialog} setOpen={setOpenSearchDialog}/>
            <Sidebar collapsible="icon" variant="floating" className="bg-green-700 z-40">
                <SidebarHeader>
                    <div className={`${isSidebarOpen ? 'justify-between' : 'justify-center'} flex`}>
                        {isSidebarOpen && <span className="font-bold text-green-600">Blogging app</span>}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <SidebarTrigger className="hover:bg-green-200"/>
                            </TooltipTrigger>
                            {!isSidebarOpen && <TooltipContent className="bg-slate-950 px-2 py-1 rounded-md" sideOffset={24} align="center" side="right">
                                <p className="text-white text-sm">Open sidebar</p> 
                            </TooltipContent>}
                        </Tooltip>
                    </div>
                </SidebarHeader>
                <SidebarSeparator className="text-green-400"/>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <SidebarMenuButton className="hover:bg-green-500/10" asChild>
                                            <Link href={'/'}>
                                                <span className="flex gap-2 items-center">
                                                    <House className="size-4"/>
                                                    {isSidebarOpen && <span className="text-black">Home</span>}
                                                </span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </TooltipTrigger>
                                    {!isSidebarOpen && <TooltipContent className="bg-slate-950 px-2 py-1 rounded-md" sideOffset={24} align="center" side="right">
                                        <p className="text-white text-sm">Home</p> 
                                    </TooltipContent>}
                                </Tooltip>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <SidebarMenuButton className="hover:bg-green-500/10" asChild>
                                            <Link href={'/blogs/new'}>
                                                <SquarePen />
                                                <span className="text-black">New blog</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </TooltipTrigger>
                                    {!isSidebarOpen && <TooltipContent className="bg-slate-950 px-2 py-1 rounded-md" sideOffset={24} align="center" side="right">
                                        <p className="text-white text-sm">New blog</p> 
                                    </TooltipContent>}
                                </Tooltip>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <SidebarMenuButton className="hover:bg-green-500/10" onClick={() => setOpenSearchDialog(true)}>
                                            <Search />
                                            <span className="text-black flex justify-between w-full">
                                                <span>Search blogs</span>  
                                                <span className="text-green-600">Ctrl+K</span>
                                            </span>
                                        </SidebarMenuButton>
                                    </TooltipTrigger>
                                    {!isSidebarOpen && <TooltipContent className="bg-slate-950 px-2 py-1 rounded-md" sideOffset={24} align="center" side="right">
                                        <p className="text-white text-sm">Search blogs</p> 
                                    </TooltipContent>}
                                </Tooltip>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                    <SidebarSeparator className={`${isSidebarOpen ? 'block' : 'hidden'}`}/>
                    <SidebarGroup className={`${isSidebarOpen ? 'block' : 'hidden'}`}>
                        <SidebarGroupLabel className="font-semibold text-md text-green-600">Your blogs</SidebarGroupLabel>
                        <Suspense fallback={<div>loading your blogs...</div>}>
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
                                                    <DropdownMenuItem onClick={() => setBlogToDelete(blog)} className="rounded-md group hover:bg-red-400/20 p-1 text-center flex justify-between items-center cursor-pointer">
                                                        <Trash className="stroke-red-500 size-5"/>
                                                        <span className="text-red-500 ">Delete</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </SidebarMenuItem>
                                    ))}
                                </div>
                            )}
                        </Suspense>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </>
    )
}