"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "./components/Navbar";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
	const router = useRouter();
	const { data: session, status } = useSession();

	return status === "unauthenticated" ? (
		router.push("/login")
	) : (
		<main className="w-screen h-screen">
			<Navbar />
			<div className="w-full flex">
				<div className="w-1/2 p-20">
					<h1 className="text-2xl font-bold">TODOs</h1>
					<p>Alle todos som er godkjent av admin.</p>
					<div className="w-96 flex flex-col justify-center overflow-y-scroll gap-2 pt-5">
						<div className="w-96 h-fit flex flex-row rounded border-2 border-black">
							<div className="w-4/6 h-full flex items-center p-3">
								Lorem ipsum, dolor sit amet consectetur
								adipisicing elit.
							</div>
							<div className="w-1/6 min-h-full flex items-center justify-center cursor-pointer">
								<FontAwesomeIcon
									icon={faCheck}
									color="lightgreen"
									className="w-8 h-8 border-2 border-black rounded p-1"
								/>
							</div>
							<div className="w-1/6 min-h-full flex items-center justify-center cursor-pointer">
								<FontAwesomeIcon
									icon={faX}
									color="red"
									className="w-8 h-8 border-2 border-black rounded p-1"
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="w-1/2 p-20">
					<h1 className="text-2xl font-bold">Lag TODOs</h1>
					<p>
						Kom med forslag til todos. Forslag krever godkjenning av
						admin.
					</p>
					<div className="flex flex-col w-full gap-2 pt-5">
						<input
							className="w-1/2 border-2 border-black rounded p-2"
							placeholder="Hva skal gjøres?"
							type="text"
						/>
						<button className="w-fit text-left border-2 border-black rounded p-2">
							Send inn forslag
						</button>
					</div>
				</div>
			</div>
		</main>
	);
}
