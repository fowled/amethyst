import { seq } from "../models/models.js";

export async function postURL(name, url, res, req) {
    const model = seq.model("links");

    try {
        await model.create({
            name: name,
            url: url
        });

        let newLink = `${req.protocol}://${req.get("host")}/${name}`;
        return res.render("home.hbs", { layout: "main.hbs", error: 200, url: newLink, color: "is-success" });
    } catch (err) {
        return res.render("home.hbs", { layout: "main.hbs", error: 500, color: "is-danger" });
    }
}
