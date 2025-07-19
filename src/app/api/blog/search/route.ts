import { NextRequest, NextResponse } from "next/server"
import prisma from '@/lib/prisma'

export async function GET(req : NextRequest) {
    const { searchParams } = new URL(req.url)
    const q = searchParams.get('q') || ""

    if(q.length < 2) return NextResponse.json([])

    const results = await prisma.blog.findMany({
        where : {
            title : {
                contains : q,
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

