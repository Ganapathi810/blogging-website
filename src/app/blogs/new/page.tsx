import { NewBlog } from "@/components/new-blog"
import { createBlog } from "@/lib/actions/create-blog"

export default function NewBlogPage() {

    return (
        <NewBlog createBlogAction={createBlog}/>
    );
}