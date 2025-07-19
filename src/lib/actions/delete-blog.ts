"use server"

import { revalidatePath } from "next/cache"
import prisma from "../prisma"

export async function deleteBlog(slug : string) {

    const decodedSlug = decodeURIComponent(slug)
    let hasError = false

    try {
        await prisma.blog.delete({
            where: { slug: decodedSlug }
        })
    } catch (error) {
        hasError = true
        console.error("Failed to delete blog:", error)
    }

  revalidatePath('/')
  return { status: hasError ? 'error' : 'success' }
}