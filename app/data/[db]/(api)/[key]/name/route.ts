import MRedis from "@/lib/redis";

export async function POST(request: Request, ctx: { params: { key: string, db: number } }) {
    const { db, key } = ctx.params
    const redis = MRedis.getRedisByIndex(db);
    const { name } = await request.json()
    return Response.json({
        data: await redis.rename(key, name)
    })
}



