import Database from "better-sqlite3";
import { createTableSQL, deleteConnectSQL, findAllConnectSQL, insertConnectSQL } from "./sql";

export type AddConnectParams = {
    name: string,
    host: string,
    port: number,
    password: string,
    mode: "direct" | "sentinel" | "cluster"
}

export type DeleteConnectParams = {
    id: number
}

let db: any = null;
function Init() {
    try {
        db = new Database("connects.db");
        db.exec(createTableSQL);
    } catch { }
}
Init()
export async function PUT(request: Request, ctx: { params: { key: string, db: number } }) {
    const body: AddConnectParams = await request.json();
    const insertStatement = db.prepare(insertConnectSQL);
    insertStatement.run(body);
    return Response.json({
        code: 0
    })

}

export async function GET(request: Request, ctx: { params: { key: string, db: number } }) {
    return Response.json({
        connects: db.prepare(findAllConnectSQL).all()
    })
}

export async function DELETE(request: Request) {
    const body: DeleteConnectParams = await request.json();
    const deleteStatement = db.prepare(deleteConnectSQL);
    deleteStatement.run(body);
    return Response.json({
        code: 0
    })
}
