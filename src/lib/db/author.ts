import prisma from "../prisma"

export const getAuthorDetails = async (authorId : string) => {
    const author = await prisma.user.findUnique({
        where : {
            id : Number(authorId)
        },
        include : {
            posts : {
                include : {
                    likedBy : true
                }
            }
        }
    })

    return author
}