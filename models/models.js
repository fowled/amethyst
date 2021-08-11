import * as logger from "../utils/Logger.js";
import Sequelize from "sequelize";

export const seq = new Sequelize("database", "username", "password", {
    host: "localhost",
    dialect: "sqlite",
    logging: false,
    storage: `${process.cwd()}/database/db.sqlite`,
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
