"use server"

import { revalidatePath } from "next/cache"
import { auth } from "../auth"
import prisma from "../prisma"

export const updateBlogLikesCount = async (slug : string) => {
     const decodedSlug = decodeURIComponent(slug)
    
    const session = await auth()
    const blog = await prisma.blog.findUnique({
        where : {
            slug : decodedSlug
        },
        select : {
            likedBy : {
                where : {
                    id : Number(session?.user?.id)
                }
            }
        }
    })

    if(!blog) {
        return { success : false, error : 'Blog not found'}
    }

    const alreadyLiked = blog.likedBy.length > 0

    if(alreadyLiked) {
        await prisma.blog.update({
            where : {
                slug : decodedSlug
            },
            data : {
              likedBy : {
                disconnect : { id : Number(session?.user?.id) }
              }  
            }
        })
    } else {
        await prisma.blog.update({
            where : {
                slug : decodedSlug
            },
            data : {
              likedBy : {
                connect : { id : Number(session?.user?.id) }
              }  
            }
        })
    }

    revalidatePath(`/blogs/${slug}`)

    return { success : true }
}