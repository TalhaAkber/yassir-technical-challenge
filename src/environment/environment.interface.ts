export interface Environment {
    database: {
        type: "mysql" | "postgres" | "mariadb";
        host: string;
        port: number;
        database: string;
        username: string;
        password: string;
    }
    iqair: {
        base_url: string;
        key: string;
    }
}