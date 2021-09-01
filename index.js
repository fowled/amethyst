import express from "express";
import * as path from "path";
import * as dotenv from "dotenv";
import exphbs from "express-handlebars";
import https from "https";
import http from "http";
import * as fs from "fs";

import { initDatabase } from "./static/models/models.js";
import { getURL } from "./static/JS/getURL.js";
import { postURL } from "./static/JS/postURL.js";
import * as logger from "./static/utils/Logger.js";

const app = express();
const port = 3000;

dotenv.config();
initDatabase();
registerServers();

app.use(express.static(path.resolve("./static"), { dotfiles: "allow" }));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "hbs");
app.set("views", path.resolve("./static/views"));

app.engine("hbs",
    exphbs({
        extname: "hbs",
        layoutsDir: path.resolve("./static/views/layouts/"),
        partialsDir: path.resolve("./static/views/partials/"),
        helpers: {
            equal: function (a, b, options) {
                return a == b ? options.fn(this) : options.inverse(this);
            },

            setVar: function (varName, varValue, options) {
                options.data.root[varName] = varValue;
            },
        },
    })
);

app.get(["/index.js", "/"], async (req, res) => {
    res.render("home");
});

app.get("/:id/", async (req, res, next) => {
    getURL(encodeURIComponent(req.params.id), res);
});

app.post(["*"], async (req, res, next) => {
    if (req.body.password !== process.env.PASSWORD) {
        return res.render("home", {
            layout: "main",
            error: 403,
            color: "is-warning",
        });
    } else {
        return postURL(encodeURIComponent(req.body.name), req.body.url, res, req);
    }
});

function registerServers() {
    http.createServer(app)
        .listen(port)
        .on("listening", () => {
            logger.log("HTTP server listening");
        });

    if (process.env.DEV === "true") {
        return;
    }

    const httpsOptions = {
        key: fs.readFileSync(""),
        cert: fs.readFileSync(""),
        ca: fs.readFileSync(""),
    };

    https.createServer(httpsOptions, app)
        .listen(port)
        .on("listening", () => {
            logger.log("HTTPS server listening");
        });
}
