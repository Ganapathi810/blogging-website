import prisma from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req : NextRequest,{ params } : { params :{ slug : string } }) {
    const { slug } = params;
    const decodedSlug = decodeURIComponent(slug)

    try {
        const blog = await prisma.blog.findUnique({
            where : { slug : decodedSlug }
        })

        if(!blog) {
            return NextResponse.json({ error : "Blog is not found"},{ status : 404 })
        }

        return NextResponse.json(blog,{ status : 200 })

    } catch (error) {
        console.log('Failed to retrieve blog from db '+error)
        return NextResponse.json({ error : "Internal Server Error" },{ status : 200 })
    }
}