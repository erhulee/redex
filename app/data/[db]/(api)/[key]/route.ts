import MRedis from "@/lib/redis";

export async function GET(request: Request, ctx: { params: { key: string } }) {
    const redis = MRedis.instance;
    const key = ctx.params.key;
    const type = await redis.type(key);
    let result = null
    switch (type) {
        case "hash":
            result = await redis.hgetall(key)
            break;
        case "string":
            result = await redis.get(key)
            break;
        case 'list':
            let length = await redis.llen(key);
            result = await redis.lrange(key, 0, length - 1);
    }

    const ttl = await redis.ttl(key);
    return Response.json({
        data: {
            key: key,
            type: type,
            expire: ttl,
            value: result,
        }
    })
}

export async function PUT(request: Request, ctx: { params: { key: string, db: number } }) {
    const { type, key } = await request.json();
    const db = ctx.params.db;
    const redis = MRedis.getRedisByIndex(db);
    let result = null;
    switch (type) {
        case "hash":
            result = await redis.hset(key, {})
            break;
        case "string":
            result = await redis.set(key, "default")
            break;
        case 'list':
            result = await redis.lpush(key, "default")
    }

    return Response.json({
        data: {
            type: type,
            expire: -1,
            data: result
        }
    })
}

export async function DELETE(request: Request, ctx: { params: { key: string, db: number } }) {
    const { db, key } = ctx.params;
    const redis = MRedis.getRedisByIndex(db);
    return Response.json({
        data: await redis.del(key)
    })
}


