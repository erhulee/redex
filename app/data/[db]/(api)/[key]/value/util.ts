import Redis from "ioredis"
export type Action = "update" | "insert" | "delete"

export async function ListChangeUtils(action: Action, redis: Redis, key: string, field: string, value: string = "") {
    async function updateField(key: string, index: string, value: string) {
        return await redis.lset(key, index, value)
    }

    async function deleteField(key: string, value: string) {
        return await redis.lrem(key, 1, value)
    }

    let result: any = null
    switch (action) {
        case "delete":
            result = await deleteField(key, value!);
            break;
        case "update":
            result = await updateField(key, field, value!);
            break;
    }
    return result
}
