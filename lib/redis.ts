import Redis from "ioredis"
import redisConfig from "../redis.config";
const { port, ip, database } = redisConfig
class MRedis {
    static instance = new Redis();
    static instanceGroup: Redis[] = []
    static getRedisByIndex(index: number) {
        return this.instanceGroup[index]
    }
    static get currentDB() {
        return this.instance.options.db
    }
}

{
    for (let i = 0; i < database; i++) {
        MRedis.instanceGroup.push(new Redis({
            port: port, // Redis port
            host: ip, // Redis host
            db: i, // Defaults to 0
        }))
    }
}

export default MRedis