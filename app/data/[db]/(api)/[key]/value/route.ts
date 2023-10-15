import MRedis from "@/lib/redis";
import { isValidate } from "../util";
/*
    params: {
        key:   string
        field: string
        value: string
        action: enum
    }
*/
export async function POST(request: Request, ctx: { params: { key: string, db: number } }) {
    const db = ctx.params.db;
    if (!isValidate(db)) {
        return Response.json({
            code: -1,
            msg: "参数错误"
        })
    }
    const redis = MRedis.instanceGroup[ctx.params.db];
    let body: Partial<{ type: string, value: any }> = {}
    try {
        body = JSON.parse((await request.body?.getReader().read())?.value?.toString() || "{}")
    } catch {
        return Response.json({
            code: -1,
            msg: "参数错误"
        })
    }

    const value = body.value;
    const type = body.type;
    const key = ctx.params.key;

    let result = null
    switch (type) {
        case "hash":
            result = await redis.hmset(key, value);
            break;
        case "string":
            result = await redis.set(key, value);
            break;
        case 'list':
            let length = await redis.llen(key);
            result = await redis.lrange(key, 0, length - 1);

    }

    return Response.json({
        data: {
            type: type,
            data: result
        }
    })
}


export async function GET(request: Request, ctx: { params: { key: string } }) {
    const redis = MRedis.instance;
    const key = ctx.params.key;
    const type = await redis.type(key);
    let result = null
    let size = 0
    let list = []

    switch (type) {
        case "hash":
            result = await redis.hgetall(key)
            break;
        case "string":
            result = await redis.get(key)
            break;
        case 'list':
            size = await redis.llen(key);
            list = await redis.lrange(key, 0, size - 1);
            result = {
                count: size,
                value: list.map((val, index) => ({ value: val, id: index }))
            }
            break
        case "zset":
            size = await redis.zcard(key);
            list = await redis.zrange(key, 0, size, "WITHSCORES");

            const zsetList = [];
            for (let i = 0; i < list.length; i += 2) {
                zsetList.push({
                    element: list[i],
                    score: list[i + 1]
                })
            }
            result = {
                size: size,
                value: zsetList
            }
            break
    }

    const ttl = await redis.ttl(key);
    return Response.json({
        data: {
            key: key,
            type: type,
            expire: ttl,
            value: result
        }
    })
}


