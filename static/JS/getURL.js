import { seq } from "../models/models.js";

export async function getURL(name, res, next) {
    const model = seq.model("links");
    const link = await model.findOne({ where: { name: name } });

    if (link) {
        const url = link.get("url");
        return res.redirect(url);
    } else {
        return res.render("home", { layout: "main", error: 404, color: "is-danger" });
    }
}
