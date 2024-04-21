import { prisma } from "../../prisma/init";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const generatedLinkName = await generateRandomName();
		const url: string = !req.body.url.startsWith("http")
			? `http://${req.body.url}`
			: req.body.url;

		await prisma.link.create({ data: { name: generatedLinkName, url } });

		return void res
			.status(202)
			.send({ url: `${process.env.ENDPOINT}/${generatedLinkName}` });
	} catch (err) {
		console.log(err);

		return void res.status(403).end();
	}
}

async function generateRandomName(): Promise<string> {
	const proposal = Math.random()
		.toString(36)
		.replace(/[^a-z]+/g, "")
		.substring(0, 5);

	const query = await prisma.link.findUnique({ where: { name: proposal } });

	if (query) {
		return generateRandomName();
	} else {
		return proposal;
	}
}
