import { prisma } from "../../prisma/init";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const query = await prisma.link.findUnique({ where: { name: req.query.url as string } });

	if (query === null) {
		return res.status(404).end();
	} else {
		return res.status(200).send(query);
	}
}
