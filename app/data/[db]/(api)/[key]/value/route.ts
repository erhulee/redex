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

export type ListUpdateParams = {
    type: "list",
    add_mode: "left" | "right",
    element: string
}

export type StringUpdateParams = {
    type: "string",
    value: string
}

type KeyUpdateParams = ListUpdateParams | StringUpdateParams
export async function POST(request: Request, ctx: { params: { key: string, db: number } }) {
    const db = ctx.params.db;
    const key = ctx.params.key;

    if (!isValidate(db)) {
        return Response.json({
            code: -1,
            msg: "参数错误"
        })
    }
    const redis = MRedis.instanceGroup[ctx.params.db];
    let body: KeyUpdateParams = await request.json();
    const type = body.type;

    let result = null
    switch (type) {
        case "hash":
            // result = await redis.hmset(key, value);
            break;
        case "string":
            // result = await redis.set(key, value);
            break;
        case 'list':
            const { add_mode = 'left', element } = body;
            console.log("add_mode:", add_mode)
            if (add_mode == "left") {
                result = await redis.lpush(key, element);
            }
            if (add_mode == "right") {
                result = await redis.rpush(key, element);
            }
            break;
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


export type ListDeleteParams = {
    type: "list",
    delete_count: "one" | "all",
    element: string
}
type KeyDeleteParams = ListDeleteParams
export async function DELETE(request: Request, ctx: { params: { key: string, db: number } }) {
    const { db, key } = ctx.params;
    const body: KeyDeleteParams = await request.json();
    const type = body.type;
    const redis = MRedis.instanceGroup[db];
    let result = null
    switch (type) {
        case "list":
            const { delete_count, element } = body
            if (delete_count == "all") {
                // TODO
            } else {
                result = await redis.lrem(key, 1, element)
            }
    }

    return Response.json({
        type,
        data: result
    })
}

