import MRedis from "@/lib/redis";
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest, ctx: { params: { db: number } }) {
    const targetDB = ctx.params.db

    if (targetDB == undefined) {
        return Response.json({
            data: [],
        })
    }
    const redis = MRedis.instanceGroup[targetDB];


    let pattern = "*"
    if (request.nextUrl.searchParams.has("pattern")) {
        pattern = request.nextUrl.searchParams.get("pattern")!
    }
    const keys = await redis.keys(pattern);

    return Response.json({
        data: await Promise.all(keys.map(async key => ({
            type: await redis.type(key),
            name: key
        }))),
    })
}

