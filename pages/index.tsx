import { Twitter, GitHub, AlertCircle, CheckCircle } from "react-feather";
import { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";

import Router from "next/router";
import Image from "next/image";
import Head from "next/head";

import type { NextPage } from "next";

const Home: NextPage = () => {
	const navbar = [
		{ label: "GitHub", link: "https://github.com/fowled/amethyst" },
		{ label: "Pricing", link: "#pricing" },
		{ label: "Developer", link: "https://fowled.club" },
		{ label: "Mango", link: "https://mango.bot" },
	];

	const stats = [
		{ label: "Created", value: "2022" },
		{ label: "Links shortened", value: "5" },
		{ label: "Beta Users", value: "521" },
		{ label: "Raised", value: "$25M" },
	];

	const footer = {
		main: [
			{ label: "GitHub", link: "https://github.com/fowled/amethyst" },
			{ label: "Pricing", link: "#pricing" },
			{ label: "Developer", link: "https://fowled.club" },
			{ label: "Mango", link: "https://mango.bot" },
		],
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

	const [banner, setBanner] = useState({ shown: false } as { shown: boolean; color: string; icon: JSX.Element; iconColor: string; text: string; buttonText: string; url: string | null });
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
				setBanner({ shown: true, color: "rgb(220 38 38)", icon: <AlertCircle />, iconColor: "rgb(153 27 27)", text: "Uh oh... something bad happened.", buttonText: "Retry", url: null });
				break;

			case 202:
				setBanner({ shown: true, color: "rgb(34 197 94)", icon: <CheckCircle />, iconColor: "rgb(21 128 61)", text: "Successfully created your link!", buttonText: "Copy link", url: (await res.json()).url });
				break;
		}
	};

	const bannerButton = async () => {
		setBanner({ ...banner, shown: false });

		if (banner.url) {
			return navigator.clipboard.writeText(banner.url as string);
		} else {
			return Router.reload();
		}
	};

	return (
		<Fragment>
			<Head>
				<title>Amethyst - URL Shortener</title>
				<link rel="icon" href="/logo.png" />
				<meta name="description" content="Combining moderation, games, economy and fun commands, you won't need any other Discord bot." />
				<meta property="og:url" content="https://amethyst-fowled.vercel.app/" />
				<meta property="og:site_name" content="Amethyst" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="Amethyst - URL Shortener" />
				<meta property="og:description" content="Sleek URL shortener for cool guys." />
				<meta property="og:image" content="/logo.png" />
				<meta name="theme-color" content="#a233ff" />
			</Head>

			<div className="h-screen relative bg-white">
				<div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
					<div className="flex justify-start lg:w-0 lg:flex-1">
						<a href="#" className="flex">
							<Image className="sm:h-10" src="/logo.png" height={50} width={50} alt="logo" />
						</a>
					</div>

					<nav className="hidden md:flex space-x-10">
						{navbar.map((item) => (
							<a href={item.link} key={item.label} className="text-base font-medium text-gray-500 hover:text-gray-900">
								{item.label}
							</a>
						))}
					</nav>

					<div className="flex items-center justify-end md:flex-1 lg:w-0">
						<a href="#pricing" className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
							Buy premium
						</a>
					</div>
				</div>

				<div className="relative my-auto">
					<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
						<div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
							<div className="absolute inset-0">
								<Image className="h-full w-full object-cover blur" src="/background.jpg" layout="fill" alt="People working on laptops" />

								<div className="absolute inset-0 bg-indigo-700 mix-blend-multiply"></div>
							</div>

							<div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
								<h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
									<span className="block text-white">What if shortening links</span>
									<span className="block text-indigo-200">was made simple?</span>
								</h1>

								<p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl">Here at Amethyst, we believe sharing long links can sometimes be unprofessional. Paste your long-query-string-filled URL below and get a clean, short one.</p>

								<div className="mt-12 max-w-md mx-auto">
									<form onSubmit={saveChanges} className="mt-12 sm:mx-auto sm:max-w-lg sm:flex">
										<div className="min-w-0 flex-1">
											<input pattern="^(https?://)?([a-zA-Z0-9]([a-zA-ZäöüÄÖÜ0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$" required autoComplete="off" onChange={handleChange} className="block w-full border border-transparent rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600" title="enter a valid URL" placeholder="Enter URL" />
										</div>

										<div className="mt-4 sm:mt-0 sm:ml-3">
											<button type="submit" className="block w-full rounded-md border border-transparent px-5 py-3 bg-indigo-500 text-base font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-5">
												Shorten it!
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="relative px-4 sm:px-6 lg:px-8 py-14">
					<div className="text-lg max-w-prose mx-auto">
						<h1>
							<span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">Introducing Amethyst ✨</span>
						</h1>
					</div>

					<div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
						<p>
							Faucibus commodo massa rhoncus, volutpat. <strong>Dignissim</strong> sed <strong>eget risus enim</strong>. Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. <a href="#">Mattis mauris semper</a> sed amet vitae sed turpis id.
						</p>

						<ul role="list">
							<li>Quis elit egestas venenatis mattis dignissim.</li>
							<li>Cras cras lobortis vitae vivamus ultricies facilisis tempus.</li>
							<li>Orci in sit morbi dignissim metus diam arcu pretium.</li>
						</ul>

						<p>Quis semper vulputate aliquam venenatis egestas sagittis quisque orci. Donec commodo sit viverra aliquam porttitor ultrices gravida eu. Tincidunt leo, elementum mattis elementum ut nisl, justo, amet, mattis. Nunc purus, diam commodo tincidunt turpis. Amet, duis sed elit interdum dignissim.</p>

						<h2>Pricing</h2>

						<p>Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat in. Convallis arcu ipsum urna nibh. Pharetra, euismod vitae interdum mauris enim, consequat vulputate nibh. Maecenas pellentesque id sed tellus mauris, ultrices mauris. Tincidunt enim cursus ridiculus mi. Pellentesque nam sed nullam sed diam turpis ipsum eu a sed convallis diam.</p>

						<blockquote>
							<p>Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed consectetur neque tristique pellentesque. Blandit amet, sed aenean erat arcu morbi.</p>
						</blockquote>

						<p>Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.</p>

						<h2>Have any questions?</h2>

						<p>
							Purus morbi dignissim senectus mattis <a href="#">adipiscing</a>. Amet, massa quam varius orci dapibus volutpat cras. In amet eu ridiculus leo sodales cursus tristique. Tincidunt sed tempus ut viverra ridiculus non molestie. Gravida quis fringilla amet eget dui tempor dignissim. Facilisis auctor venenatis varius nunc, congue erat ac. Cras fermentum convallis quam.
						</p>

						<p>Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.</p>
					</div>
				</div>

				<footer className="bg-white max-w-xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8 border-t">
					<nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
						{footer.main.map((item) => (
							<div key={item.label} className="px-5 py-2">
								<a href={item.link} className="text-base text-gray-500 hover:text-gray-900">
									{item.label}
								</a>
							</div>
						))}
					</nav>

					<div className="mt-8 flex justify-center space-x-6">
						{footer.social.map((item) => (
							<a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
								{item.icon}
							</a>
						))}
					</div>

					<p className="mt-8 text-center text-base text-gray-400">&copy; 2022, made by @fowled. All rights reserved.</p>
				</footer>

				<Transition show={banner.shown} enter="transition duration-700 transform" enterFrom="translate-y-full" enterTo="translate-y-0" leave="transition duration-700 transform" leaveFrom="translate-y-0" leaveTo="translate-y-full" className="bottom-0 fixed inset-x-0 pb-2 sm:pb-5 max-w-xl mx-auto px-2 sm:px-6 lg:px-8">
					<div className="p-2 rounded-lg shadow-lg sm:p-3 flex items-center justify-between flex-wrap" style={{ backgroundColor: banner.color }}>
						<div className="w-0 flex-1 flex items-center">
							<span className="flex p-2 rounded-lg" style={{ backgroundColor: banner.iconColor }}>
								<span className="h-6 w-6 text-white">{banner.icon}</span>
							</span>

							<p className="ml-3 font-medium text-white truncate">{banner.text}</p>
						</div>

						<span onClick={bannerButton} className="flex cursor-pointer ml-2 order-4 items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white" style={{ backgroundColor: banner.iconColor }} role="button" tabIndex={0}>
							{banner.buttonText}
						</span>
					</div>
				</Transition>
			</div>
		</Fragment>
	);
};

export default Home;
