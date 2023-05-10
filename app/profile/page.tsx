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
			{/* @ts-ignore */}
			<Navbar isAdmin={session?.user.isAdmin} />
			<div className="w-full p-20">
				<h1 className="text-2xl font-bold">Profile</h1>
				<p className="text-lg mt-5">{session?.user.email}</p>
				<button
					className="border-2 mt-5 border-black p-2 rounded"
					onClick={() => signOut({ callbackUrl: "/login" })}
				>
					Logg ut
				</button>
			</div>
		</main>
	);
}
