import { ListDeleteParams, ListUpdateParams } from "../(api)/[key]/value/route";
import { del, post } from "./http";

export function addListItem(env: { db: number, key: string }, params: ListUpdateParams) {
    return post(`/data/${env.db}/${env.key}/value`, params)
}

export function deleteListItem(env: { db: number, key: string }, params: ListDeleteParams) {
    return del(`/data/${env.db}/${env.key}/value`, params)
}