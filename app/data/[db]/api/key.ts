import { del, post } from "./http";

export function setExpire(key: string, currentDB: number, expire: number) {
    return post(`/data/${currentDB}/${key}/expire`, {
        expire
    })
}
export function setName(key: string, currentDB: number, name: string) {
    return post(`/data/${currentDB}/${key}/name`, {
        name
    })
}

export function deleteKey(key: string, currentDB: number,) {
    return del(`/data/${currentDB}/${key}`, {})
}