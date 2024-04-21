import { prisma } from "../../prisma/init";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const query = await prisma.link.findUnique({
		where: { name: req.query.url as string },
	});

	if (query === null) {
		return void res.status(404).end();
	} else {
		return void res.status(200).send(query);
	}
}
