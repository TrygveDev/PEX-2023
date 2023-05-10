"use client";

import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";

export default function About() {
	const router = useRouter();
	const { data: session, status } = useSession();

	return status === "unauthenticated" ? (
		router.push("/login")
	) : (
		<main className="w-screen h-screen">
			<Navbar />
			<div className="w-full p-20">
				<h1 className="text-2xl font-bold">About</h1>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit.
					Quas quasi obcaecati velit reprehenderit, voluptatem quidem
					officiis illo iste, corporis hic asperiores laudantium id
					vel porro maxime fugit natus eius animi.
				</p>
			</div>
		</main>
	);
}
