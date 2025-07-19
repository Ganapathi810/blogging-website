import AuthorProfileBlogs from "@/components/author-profile-blogs";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getAuthorDetails } from "@/lib/db/author";
import { AvatarFallback } from "@radix-ui/react-avatar";

export default async function AuthorProfile({ params } : { params : Promise<{ authorId : string }> }) {
    const { authorId } = await params
    const author = await getAuthorDetails(authorId)

    return (
        <div className='py-10 px-5 md:p-10 flex justify-center'>
            <div className="md:max-w-[80vw]">
                <div className="flex gap-3 items-center ml-4">
                    <Avatar className="size-16 md:size-20">
                        <AvatarImage src={author?.avatar}/>
                        <AvatarFallback><div className="bg-green-300/50 size-16 animate-pulse"></div></AvatarFallback>
                    </Avatar>
                    <div className="text-3xl md:text-4xl font-bold text-wrap">{author?.name}</div>
                </div>
                <div className="w-full mt-6">
                    <h1 className="ml-5 text-2xl text-green-500 font-semibold">Blogs</h1>
                    <hr className="h-0.5 bg-green-500/40 flex grow ml-4 mr-5" />
                </div>
                <AuthorProfileBlogs blogs={author?.posts} />
            </div>
        </div>
    )
}