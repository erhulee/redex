import MRedis from "@/lib/redis";
import { isValidate } from "../util";

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


// export async function GET(request: Request, ctx: { params: { key: string } }) {
//     const redis = MRedis.instance;
//     const key = ctx.params.key;
//     const type = await redis.type(key);
//     let result = null
//     switch (type) {
//         case "hash":
//             result = await redis.hgetall(key)
//             break;
//         case "string":
//             result = await redis.get(key)
//             break;
//         case 'list':
//             let length = await redis.llen(key);
//             result = await redis.lrange(key, 0, length - 1);
//     }

//     const ttl = await redis.ttl(key);
//     return Response.json({
//         data: {
//             key: key,
//             type: type,
//             expire: ttl,
//             value: result
//         }
//     })
// }


