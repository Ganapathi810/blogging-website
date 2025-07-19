"use client"

import { useDeleteBlog } from "@/contexts/delete-blog-context"
import { Button } from "./ui/button"
import { Blog } from "@prisma/client"

export default function DeleteButtonWrapper({ blog } : { blog : Blog }) {
    const { setBlogToDelete } = useDeleteBlog()
    return (
        <div>
            <Button type='submit' onClick={() => setBlogToDelete(blog)} variant="destructive">delete blog</Button>
        </div>
    )
}