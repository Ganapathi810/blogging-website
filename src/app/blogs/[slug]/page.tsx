
import TiptapContentViewer from "@/components/tiptap-content-viewer"
import { Button } from "@/components/ui/button"
import { getBlogPost } from "@/lib/db/blog"
import { Content } from '@tiptap/react'
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { AvatarFallback } from "@radix-ui/react-avatar"
import { oxanium, sourGummy, spaceMono } from "@/lib/fonts"
import ClapHands from "@/components/ClapHands"
import { auth } from "@/lib/auth"
import { format } from 'date-fns'
import DeleteButtonWrapper from "@/components/delete-button-wrapper"


export default async function Blog({ params } : { params : Promise<{ slug : string }>}) {
    const { slug } = await params
    const blog = await getBlogPost(slug)
    const session = await auth()
    
    if(!blog) {
        return <div className="h-[92vh] flex justify-center items-center text-green-900">Blog post not found</div>
    }


    return (
        <div className="flex justify-center mt-5">
            <div className="flex flex-col items-start px-5 max-w-6xl">
                {Number(session?.user?.id) === blog.authorId && <div className="flex justify-end w-full">
                    <div className="flex gap-3">
                        <Link href={`/blogs/${encodeURIComponent(blog.slug)}/edit`}>
                            <Button type='submit' className="bg-green-400 hover:bg-green-500 active:bg-green-600">Edit blog</Button>
                        </Link>
                        <DeleteButtonWrapper blog={blog}/>
                    </div>
                </div>}
                <div className={cn(spaceMono.className,"mt-5 ml-1")}>{format(new Date(blog.createdAt),"EEEE, MMMM do yyyy")}</div>
                <div className={cn(oxanium.className,"mt-5")}><span className="text-5xl font-bold">{blog.title}</span></div>
                <div className="text-gray-900 mt-6"><span className={sourGummy.className}>Posted by</span></div>
                <div className="flex gap-3 items-center">
                    <Button asChild variant={'link'} className="mt-1">
                        <Link href={`/author/${blog.author.id}/profile`}>
                            <div className="flex gap-2 mt-3">
                                <Avatar>
                                    <AvatarImage src={blog.author.avatar} />
                                    <AvatarFallback><div className="rounded-full size-6 animate-pulse bg-green-300/50"></div></AvatarFallback>
                                </Avatar>
                                <div className="text-xl font-semibold">{blog.author.name}</div>
                            </div>
                        </Link>
                    </Button>
                    <ClapHands count={blog.likedBy.length} slug={blog.slug}/>
                </div>
                <div className="w-full mt-6">
                    <hr className="h-0.5 bg-green-500/40 flex grow" />
                </div>
                <TiptapContentViewer content={blog.content as Content} />
            </div>
        </div>
        
    )
}