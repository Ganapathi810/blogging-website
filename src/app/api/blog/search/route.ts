import { NextRequest, NextResponse } from "next/server"
import prisma from '@/lib/prisma'

export async function GET(req : NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get('query') || ""

    if(query.length < 2) return NextResponse.json([])

    const results = await prisma.blog.findMany({
        where : {
            title : {
                contains : query,
                mode : "insensitive"
            }
        },
        select : {
            id : true,
            title : true,
            slug : true
        },
        take : 5
    })

    return NextResponse.json(results)
}

