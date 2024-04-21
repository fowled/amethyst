import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;

	if (path.includes(".") || path.startsWith("/api/")) {
		return;
	}

	const slug = path.split("/")[1];

	if (!slug) {
		return NextResponse.next();
	}

	const apiUrl = `${process.env.ENDPOINT}/api/get?url=${slug}`;

	const query = await fetch(apiUrl);

	if (query.status === 404) {
		const url = new URL(process.env.ENDPOINT as string);
		url.searchParams.append("code", "404");

		return NextResponse.redirect(url);
	} else {
		const result = await query.json();
		const url = new URL(result.url);

		return NextResponse.redirect(url);
	}
}

export const config = {
	matcher: "/:path*",
};
