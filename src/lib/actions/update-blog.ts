"use server"

import { revalidatePath } from "next/cache"
import prisma from "../prisma"
import { redirect } from "next/navigation"

export async function updateBlog(formData : FormData) {
    const title = formData.get('title') as string
    const content = JSON.parse(formData.get('content') as string)
    const oldSlug = formData.get('oldSlug') as string

    const newSlug = title.trim().toLowerCase().replace(/\s+/g, "-")

    await prisma.blog.update({
        where : {
            slug : oldSlug
        },
        data : {
            title,
            content,
            slug : newSlug,
        }
    })

    revalidatePath('/')
    redirect('/')
}