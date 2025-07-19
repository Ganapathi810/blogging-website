"use client"

import { Blog } from "@/generated/prisma"
import { createContext, useContext, useState } from "react"

type DeleteBlogContextType = {
    blogToDelete : Blog | null,
    setBlogToDelete : (blog : Blog | null) => void
}

const DeleteBlogContext = createContext<DeleteBlogContextType | null>(null)

export const DeleteBlogContextProvider = ({ children } : { children : React.ReactNode}) => {
    const [blogToDelete,setBlogToDelete] = useState<Blog | null>(null)

    return (
        <DeleteBlogContext.Provider value = {{ blogToDelete,setBlogToDelete}}>
            {children}
        </DeleteBlogContext.Provider>
    )
}

export const useDeleteBlog = () => {
    const context = useContext(DeleteBlogContext)

    if(!context) throw new Error('useDeleteBlog must be within DeleteBlogContextProvider')

    return context
}