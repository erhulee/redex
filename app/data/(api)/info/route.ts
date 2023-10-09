import MRedis from "@/lib/redis";

export async function GET(request: Request) {
    const redis = MRedis.instance;
    const currentDB = redis.options.db!;

    const [_, databases] = await redis.config('GET', "databases") as [string, string]
    const result = [];
    for (let i = 0; i < Number(databases); i++) {
        await redis.select(i);
        const keys = await redis.dbsize();
        result.push({
            name: `db${i}`,
            value: i,
            keys: keys
        })
    }
    await redis.select(currentDB)
    return Response.json({ currentDB: currentDB, DBList: result })
}
