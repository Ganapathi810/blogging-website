import prisma from "../prisma"

export const getBlogPost = async (slug : string) => {
    const decodedSlug = decodeURIComponent(slug)

    const blog = await prisma.blog.findUnique({
        where : { slug : decodedSlug },
        include : {
            likedBy : true,
            author : {
                select : {
                    id : true,
                    name : true,
                    avatar : true,
                }
            }
        }
    })

    return blog
}


export const getAllBlogsOfUser = async (id : number) => {
    const blogs = await prisma.blog.findMany({
        where : { authorId : id },
    })

    return blogs
}

export const getAllBlogsInDb = async () => {
    const blogs = await prisma.blog.findMany({
        orderBy : {
            createdAt : 'desc'
        },
        include : {
            author : {
                select : {
                    id : true,
                    name : true,
                    avatar : true
                }
            },
            likedBy : true
        }   
      }  
    )
    return blogs
}