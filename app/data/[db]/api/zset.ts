import { del, put } from "./http"
import { ENV } from "./type"
import { ZSetDeleteParams, ZSetAppendParams } from "@/app/data/[db]/(api)/[key]/value/route"
export const ZSetCURD = {
    delete(env: ENV, params: ZSetDeleteParams) {
        return del(`/data/${env.db}/${env.key}/value`, params)
    },
    add(env: ENV, params: ZSetAppendParams) {
        return put(`/data/${env.db}/${env.key}/value`, params)
    }
}