import * as logger from "../utils/Logger.js";
import { Sequelize } from "sequelize";
import path from "path";

export const seq = new Sequelize("database", "username", "password", {
    host: "localhost",
    dialect: "sqlite",
    dialectModulePath: path.resolve("./node_modules/sqlite3/sqlite3.js"),
    logging: false,
    storage: path.resolve("./database/db.sqlite"),
});

export async function initDatabase() {
    seq.define("links", {
        name: {
            type: Sequelize.Sequelize.STRING,
            unique: true,
        },
        url: Sequelize.Sequelize.STRING
    });

    logger.log("Synchronizing DB models...");
    await seq.model("links").sync();
}
