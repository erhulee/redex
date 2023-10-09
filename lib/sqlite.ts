import Database from 'better-sqlite3';
class MSqlite {
    private static _instance = new MSqlite()
    private static _sqlite: ReturnType<typeof Database>;
    private constructor() {
        const sqlite = new Database("setting.db");
        MSqlite._sqlite = sqlite
        // // const sql = sqlite.prepare("CREATE TABLE setting database int;")
        // const db = sqlite.exec(`CREATE TABLE cats
        //     (
        //         id      INTEGER PRIMARY KEY AUTOINCREMENT,
        //         name    CHAR(50)           NOT NULL,
        //         age   INT
        //     );`);
        // console.log("Db:", db)
    }
    static Create() {
        return this._instance
    }
    get sqlite() {
        return MSqlite._sqlite
    }
}


export default MSqlite