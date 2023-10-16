import { ListDeleteParams, ListUpdateParams, ListItemUpdateParams } from "../(api)/[key]/value/route";
import { del, post, put } from "./http";

export function addListItem(env: { db: number, key: string }, params: ListUpdateParams) {
    return put(`/data/${env.db}/${env.key}/value`, params)
}

export function deleteListItem(env: { db: number, key: string }, params: ListDeleteParams) {
    return del(`/data/${env.db}/${env.key}/value`, params)
}

export function updateListItemByIndex(env: { db: number, key: string }, params: ListItemUpdateParams) {
    return post(`/data/${env.db}/${env.key}/value`, params)
}