import { Sequelize } from "sequelize";
import { init as initTransitions } from "../DAL/ApiTransition"; // Assuming the init function is exported as "init" from "../DAL/ApiUser"
const HOST = process.env.DB_HOST as string;
console.log("process.env.DB_HOST  =====>" , HOST);

export async function init() {
    const sequelize = new Sequelize({
        database: process.env.PGDATABASE,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        dialect: "postgres",
        host:  HOST
    });

    const transition = await initTransitions(sequelize); // Use the correct function name for initialization

    return {
        transition
    };
}
