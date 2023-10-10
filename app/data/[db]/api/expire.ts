import { post } from "./http";

export function setExpire(key: string, currentDB: number, expire: number) {
    return post(`/data/${currentDB}/${key}/expire`, {
        expire
    })
}