"use server"

import prisma from "../prisma"
import { auth } from "../auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createBlog(formData : FormData) {
    const session = await auth()
    const title = formData.get('title') as string
    const content = JSON.parse(formData.get('content') as string)

    const slug = title.trim().toLowerCase().replace(/\s+/g, "-")

    try {
        await prisma.blog.create({
            data : {
                title,
                content,
                slug,
                authorId : Number(session?.user?.id)
            }
        })
        
    } catch (error) {
        console.log("Failed to create the blog : "+error)
    }

    revalidatePath('/')
    redirect('/')
}