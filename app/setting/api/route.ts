import MSqlite from "@/lib/sqlite";
export async function GET(request: Request) {
    const sqlite = MSqlite.Create().sqlite;
    console.log(MSqlite.Create())
    const stmt = sqlite.prepare('SELECT * FROM cats');
    const all = stmt.all();
    return Response.json({
        d: all
    })

}
