import { Sequelize } from "sequelize";
import { init as initUser } from "../DAL/ApiUser"; // Assuming the init function is exported as "init" from "../DAL/ApiUser"
const HOST = process.env.DB_HOST as string;

export async function init() {
    const sequelize = new Sequelize({
        database: process.env.POSTGRES_DB,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        dialect: "postgres",
        host:  HOST
    });

    const user = await initUser(sequelize); // Use the correct function name for initialization

    return {
        user
    };
}
