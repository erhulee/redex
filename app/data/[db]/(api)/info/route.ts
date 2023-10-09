import MRedis from "@/lib/redis";

export async function GET(request: Request, ctx: { params: { db: number } }) {
    const keys = await MRedis.getKeys();
    const currentDB = MRedis.currentDB;
    const redis = MRedis.instance;
    console.log(currentDB, ctx.params.db)
    return Response.json({ data: await redis.select(currentDB), db: MRedis.currentDB })
}

