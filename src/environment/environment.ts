import { Environment } from "./environment.interface";

export const environment: Environment = {
    database: {
        type: "mysql",
        host: "localhost",
        port: 3306,
        database: "yassir_db",
        username: "root",
        password: "root"
    },
    iqair: {
        base_url: "http://api.airvisual.com/v2",
        key: "7ed96bc4-301a-4bd1-90db-771d00459f4f" // TODO: leaving it only for demo, should be remove at all cost and never have pushed to git
    }
}