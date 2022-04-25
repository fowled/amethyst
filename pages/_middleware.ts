import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
	if (req.nextUrl.pathname === "/") {
		return;
	}

	const query = await fetch(`${process.env.ENDPOINT}/api/get?url=${req.nextUrl.pathname.split("/")[1]}`);

	if (query.status === 404) {
		return;
	} else {
		const result = await query.json();

		const url = new URL(result.url);

		return NextResponse.redirect(url);
	}
}
