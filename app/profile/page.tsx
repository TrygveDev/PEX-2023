"use client";

import { useSession, signOut } from "next-auth/react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";

export default function Profile() {
	const router = useRouter();
	const { data: session, status } = useSession();

	return status === "unauthenticated" ? (
		router.push("/login")
	) : (
		<main className="w-screen h-screen">
			<Navbar />
			<div className="w-full p-20">
				<h1 className="text-2xl font-bold">Profile</h1>
				<p>Velkommen, {session?.user.email}</p>
				<button
					className="border-2 border-black p-2 rounded"
					onClick={() => signOut({ callbackUrl: "/login" })}
				>
					Logg ut
				</button>
			</div>
		</main>
	);
}
