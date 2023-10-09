import { RedisKey } from "ioredis";
import { RedisKeyType } from "./(api)/type";

export async function getKeyInfo(db: string, key: string) {
    const { data } = await (
        await fetch(`http://localhost:3000/data/${db}/${key}`, {
            cache: "no-store",
        })
    ).json();
    return {
        type: data.type,
        expire: data.expire,
        data: data.data
    }
}

export async function getCurrentDBInfo() {
    const { currentDB, DBList: DBListData } = await (
        await fetch(`http://localhost:3000/data/info`, { cache: "no-store" })
    ).json();
    return {
        currentDB,
        DBListData
    }
}

export async function getCurrentDBKeys(currentDB: number | string, pattern: string) {
    const { data } = await (
        await fetch(`http://localhost:3000/data/${currentDB}/keys?pattern=${pattern}`, {
            cache: "no-store",
        })
    ).json();

    return {
        keysData: data as Array<{
            type: string,
            name: string
        }>
    }
}

export async function getKeyValue(currentDB: number | string, key: string) {
    const { data } = await (
        await fetch(`http://localhost:3000/data/${currentDB}/${key}`, {
            cache: "no-store",
        })
    ).json();
    return {
        value: data.data,
        expire: data.expire,
        type: data.type
    }
}
export async function createKey(key: RedisKey, type: RedisKeyType.String, currentDB: number | string): Promise<any>;
export async function createKey(key: RedisKey, type: RedisKeyType, currentDB: number | string) {
    const data = {
        key,
        type
    }
    const response = await (await fetch(`http://localhost:3000/data/${currentDB}/${key}`, {
        method: "put",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })).json();
    return response
}