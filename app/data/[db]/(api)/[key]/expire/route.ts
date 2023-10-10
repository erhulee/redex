import MRedis from "@/lib/redis";

export async function POST(request: Request, ctx: { params: { key: string, db: number } }) {
    const { db, key } = ctx.params
    const redis = MRedis.getRedisByIndex(db);
    // type = seconds / timestamp / milliseconds / milliseconds-timestamp
    // 目前只支持 seconds
    const { expire, type = "seconds" } = await request.json()

    return Response.json({
        data: await redis.expire(key, expire)
    })
}



