import { Twitter, GitHub, AlertCircle, Info, CheckCircle } from "react-feather";
import { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { useRouter } from "next/router";

import Router from "next/router";
import Image from "next/image";
import Head from "next/head";

import type { NextPage } from "next";

const Home: NextPage = () => {
	const router = useRouter();
	const { code } = router.query;

	useEffect(() => {
		if (code != "404") {
			return;
		}

		setBanner({
			shown: true,
			color: "#8b5cf6",
			icon: <Info />,
			iconColor: "#a78bfa",
			text: "Couldn't find that link...",
			buttonText: "Alright",
			url: null,
		});
	}, [code]);

	const navbar = [
		{ label: "GitHub", link: "https://github.com/fowled/amethyst" },
		{ label: "Pricing", link: "#pricing" },
		{ label: "Developer", link: "https://fowled.dev" },
		{ label: "Mango", link: "https://bot.fowled.dev" },
	];

	const stats = [
		{ label: "Created", value: "2022" },
		{ label: "Links shortened", value: "5" },
		{ label: "Beta Users", value: "521" },
		{ label: "Raised", value: "$25M" },
	];

	const footer = {
		main: navbar,
		social: [
			{
				name: "Twitter",
				href: "https://twitter.com/playboifowled",
				icon: <Twitter />,
			},
			{
				name: "GitHub",
				href: "https://github.com/fowled",
				icon: <GitHub />,
			},
		],
	};

	const [banner, setBanner] = useState({ shown: false } as {
		shown: boolean;
		color: string;
		icon: JSX.Element;
		iconColor: string;
		text: string;
		buttonText: string;
		url: string | null;
	});

	const [formData, setFormData] = useState<string>();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormData(event.target.value);
	};

	const saveChanges = async (event: React.MouseEvent<HTMLFormElement>) => {
		event.preventDefault();

		const res = await fetch("api/create", {
			method: "POST",
			body: JSON.stringify({ url: formData }),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		});

		switch (res.status) {
			case 403:
				setBanner({
					shown: true,
					color: "rgb(220 38 38)",
					icon: <AlertCircle />,
					iconColor: "rgb(153 27 27)",
					text: "Uh oh... something bad happened.",
					buttonText: "Retry",
					url: null,
				});
				break;

			case 202:
				setBanner({
					shown: true,
					color: "rgb(0, 168, 107)",
					icon: <CheckCircle />,
					iconColor: "rgb(46 139 87)",
					text: "Successfully created your link!",
					buttonText: "Copy link",
					url: (await res.json()).url,
				});
				break;
		}
	};

	const bannerButton = async () => {
		setBanner({ ...banner, shown: false });

		if (banner.url) {
			return navigator.clipboard.writeText(banner.url as string);
		} else {
			return Router.push("/");
		}
	};

	return (
		<Fragment>
			<Head>
				<title>Amethyst - URL Shortener</title>
				<link rel="icon" href="/logo.png" />
				<meta
					name="description"
					content="Combining moderation, games, economy and fun commands, you won't need any other Discord bot."
				/>
				<meta property="og:url" content="https://link.fowled.dev" />
				<meta property="og:site_name" content="Amethyst" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="Amethyst - URL Shortener" />
				<meta
					property="og:description"
					content="Sleek URL shortener for cool guys."
				/>
				<meta property="og:image" content="/logo.png" />
				<meta name="theme-color" content="#a233ff" />
			</Head>

			<div className="relative h-screen bg-white">
				<div className="flex items-center justify-between px-4 py-6 mx-auto max-w-7xl sm:px-6 md:justify-start md:space-x-10 lg:px-8">
					<div className="flex justify-start lg:w-0 lg:flex-1">
						<a href="#" className="flex">
							<Image
								className="sm:h-10"
								src="/logo.png"
								height={50}
								width={50}
								alt="logo"
							/>
						</a>
					</div>

					<nav className="hidden space-x-10 md:flex">
						{navbar.map((item) => (
							<a
								href={item.link}
								key={item.label}
								className="text-base font-medium text-gray-500 hover:text-gray-900"
							>
								{item.label}
							</a>
						))}
					</nav>

					<div className="flex items-center justify-end md:flex-1 lg:w-0">
						<a
							href="#pricing"
							className="inline-flex items-center justify-center px-4 py-2 ml-8 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm whitespace-nowrap hover:bg-indigo-700"
						>
							Buy premium
						</a>
					</div>
				</div>

				<div className="relative my-auto">
					<div className="px-1.5 mx-auto max-w-7xl sm:px-6 lg:px-8">
						<div className="relative overflow-hidden shadow-xl rounded-2xl">
							<div className="absolute inset-0">
								<Image
									className="object-cover w-full h-full blur"
									src="/background.jpg"
									fill
									alt="People working on laptops"
								/>

								<div className="absolute inset-0 bg-indigo-700 mix-blend-multiply"></div>
							</div>

							<div className="relative px-4 py-20 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
								<h1 className="text-[1.7rem] leading-8 font-extrabold tracking-tight text-center sm:text-5xl lg:text-6xl">
									<span className="block text-white">
										What if shortening links
									</span>

									<span className="block text-indigo-200">
										was made simple?
									</span>
								</h1>

								<p className="max-w-lg mx-auto mt-6 text-base text-center text-indigo-200 sm:text-xl sm:max-w-3xl">
									Here at Amethyst, we believe sharing long links can often be
									unprofessional. Paste your long-query-string-filled URL below
									and get a clean, short one.
								</p>

								<div className="max-w-md mx-auto mt-12">
									<form
										onSubmit={saveChanges}
										className="mt-12 sm:mx-auto sm:max-w-lg sm:flex"
									>
										<div className="flex-1 min-w-0">
											<input
												pattern="^(https?://)?([a-zA-Z0-9]([a-zA-ZäöüÄÖÜ0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$"
												required
												autoComplete="off"
												onChange={handleChange}
												className="block w-full px-5 py-3 text-base text-gray-900 placeholder-gray-500 border border-transparent rounded-md shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
												title="enter a valid URL"
												placeholder="Enter URL"
											/>
										</div>

										<div className="mt-4 sm:mt-0 sm:ml-3">
											<button
												type="submit"
												className="block w-full px-5 py-3 text-base font-medium text-white bg-indigo-500 border border-transparent rounded-md shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-5"
											>
												Shorten it!
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="relative px-4 py-12 sm:px-6 lg:px-14">
					<div className="mx-auto text-lg max-w-prose">
						<h1>
							<span className="block mt-2 text-2xl font-extrabold leading-8 tracking-tight text-center text-gray-900 sm:text-4xl">
								Introducing Amethyst ✨
							</span>
						</h1>
					</div>

					<div
						id="economy"
						className="mx-auto mt-6 prose text-gray-500 sm:prose-lg prose-indigo"
					>
						<p>
							Our technology simplifies URL shortening for cleaner, more
							manageable links. Whether you're sharing in professional emails or
							on social media, <b>Amethyst</b> ensures your links look tidy and
							are easy to manage. Our process removes unnecessary query strings
							and reduces URL length, making sharing easier than ever.
						</p>

						<h3>Why choose Amethyst?</h3>

						<ul role="list">
							<li>
								<b>Efficient</b>: instantly shorten links with just a few
								clicks.
							</li>

							<li>
								<b>Clear</b>: remove clutter from URLs, making them
								user-friendly.
							</li>

							<li>
								<b>Professional</b>: present a clean link for business
								communications.
							</li>
						</ul>

						<h3>Pricing</h3>

						<p>
							Choose the plan that best fits your needs. Our basic plan offers
							up to 500 link shortenings per month, perfect for personal use.
							Upgrade to our professional plan for more features like link
							tracking and analytics, ideal for businesses. Our premium plan
							provides unlimited link shortenings and advanced analytics for
							enterprises.
						</p>

						<h3>Benefits of clean URLs</h3>

						<ul role="list">
							<li>
								<b>Enhanced accessibility</b>: shorter URLs are easier to type
								and remember.
							</li>

							<li>
								<b>Improved click-through rates</b>: attractive URLs are more
								likely to be clicked.
							</li>

							<li>
								<b>Optimized for sharing</b>: fit more content in tweets and
								other platforms where character space is limited.
							</li>
						</ul>

						<h3>Have any questions?</h3>

						<p>
							Our dedicated team is ready to assist you with any inquiries about
							our services. Get in touch to learn how Amethyst can enhance your
							digital presence and make link management straightforward. Whether
							you're looking to improve your marketing efforts or streamline
							communications, our tools are designed to help you succeed.
							<br />
							<br /> Join the thousands of users who trust Amethyst to keep
							their links concise and their communications clear. Try it today!
						</p>
					</div>
				</div>

				<footer className="max-w-xl px-4 py-12 mx-auto overflow-hidden bg-white border-t sm:px-6 lg:px-8">
					<nav
						className="flex flex-wrap justify-center -mx-5 -my-2"
						aria-label="Footer"
					>
						{footer.main.map((item) => (
							<div key={item.label} className="px-3 py-2 sm:px-5">
								<a
									href={item.link}
									className="text-base text-gray-500 hover:text-gray-900"
								>
									{item.label}
								</a>
							</div>
						))}
					</nav>

					<div className="flex justify-center mt-8 space-x-6">
						{footer.social.map((item) => (
							<a
								key={item.name}
								href={item.href}
								className="text-gray-400 hover:text-gray-500"
							>
								{item.icon}
							</a>
						))}
					</div>

					<p className="mt-8 text-base text-center text-gray-400">
						&copy; {new Date().getFullYear()}, made by @fowled. All rights
						reserved.
					</p>
				</footer>

				<Transition
					show={banner.shown}
					enter="transition duration-700 transform"
					enterFrom="translate-y-full"
					enterTo="translate-y-0"
					leave="transition duration-700 transform"
					leaveFrom="translate-y-0"
					leaveTo="translate-y-full"
					className="fixed inset-x-0 bottom-0 max-w-xl px-2 pb-2 mx-auto sm:pb-5 sm:px-6 lg:px-8"
				>
					<div
						className="flex flex-wrap items-center justify-between p-2 rounded-lg shadow-lg sm:p-3"
						style={{ backgroundColor: banner.color }}
					>
						<div className="flex items-center flex-1 w-0">
							<span
								className="flex p-2 rounded-lg"
								style={{ backgroundColor: banner.iconColor }}
							>
								<span className="w-6 h-6 text-white">{banner.icon}</span>
							</span>

							<p className="ml-3 font-medium text-white truncate">
								{banner.text}
							</p>
						</div>

						<span
							onClick={bannerButton}
							className="flex items-center justify-center order-4 px-4 py-2 ml-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm cursor-pointer"
							style={{ backgroundColor: banner.iconColor }}
							role="button"
							tabIndex={0}
						>
							{banner.buttonText}
						</span>
					</div>
				</Transition>
			</div>
		</Fragment>
	);
};

export default Home;
