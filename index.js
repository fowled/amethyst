import express from "express";
import * as path from "path";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import exphbs from "express-handlebars";

import * as logger from "./utils/Logger.js";
import { initDatabase } from "./models/models.js";
import { getURL } from "./JS/getURL.js"
import { postURL } from "./JS/postURL.js";

const app = express();
const port = 3000;

dotenv.config();
initDatabase();

const folders = ["JS", "utils", "models", "CSS", "views", "assets", "fonts"];

folders.forEach(folder => {
    app.use(`/${folder}/`, express.static(path.resolve(`./${folder}/`)));
});

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'hbs');

app.engine('hbs', exphbs({
    layoutsDir: path.resolve("./views/layouts/"),
    extname: "hbs",
    partialsDir: path.resolve("./views/partials/"),
    helpers: {
        equal: function (a, b, options) { 
            return (a == b) ? options.fn(this) : options.inverse(this) 
        }, 
        
        setVar: function (varName, varValue, options) {
            options.data.root[varName] = varValue;
        }
    }
}));

app.get(["/index.js", "/"], async (req, res) => {
    res.render(path.resolve("./views/home.hbs"));
});

app.get("/:id/", async (req, res, next) => {
    getURL(req.params.id, res);
});

app.post(["*"], async (req, res, next) => {
    if (req.body.password !== process.env.PASSWORD) {
        return res.render("home.hbs", { layout: "main.hbs", error: 403, color: "is-warning" });
    } else {
        return postURL(req.body.name, req.body.url, res, req);
    }

});

app.listen(port, () => {
    logger.log(`Now listening at http://localhost:${port}`);
});