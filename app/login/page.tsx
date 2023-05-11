"use client";

import { signIn } from "next-auth/react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Login() {
	const [isRegistering, setIsRegistering] = useState(false);
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	return (
		<main className="w-screen h-screen">
			<div className="w-full h-full flex flex-col align-center justify-center items-center">
				{isRegistering ? (
					<>
						<h1 className="text-2xl font-bold">Opprett bruker</h1>
						<div className="flex flex-col items-center justify-center gap-2">
							<input
								className="border-2 border-black rounded w-52 p-2 focus:outline-none"
								placeholder="Email"
								type="text"
								disabled={loading}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<input
								className="border-2 border-black rounded w-52 p-2 focus:outline-none"
								placeholder="Password"
								type="password"
								disabled={loading}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<button
								className="border-2 border-black p-2 w-52 rounded focus:outline-none"
								disabled={loading}
								onClick={() => {
									setLoading(true);
									const emailRegex =
										/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
									if (!emailRegex.test(email)) {
										setLoading(false);
										return toast.error("Ugyldig email!");
									}
									if (password.length < 6) {
										setLoading(false);
										return toast.error(
											"For svakt passord!"
										);
									}
									axios
										.post("/api/register", {
											email: email,
											password: password,
										})
										.then(() => {
											toast.success(
												"Bruker laget, logg inn!"
											);
											setIsRegistering(false);
										})
										.catch((err) => {
											toast.error(
												"En intern feil oppstod!"
											);
											console.log(err);
										})
										.finally(() => {
											setLoading(false);
										});
								}}
							>
								Lag bruker
							</button>
							<p
								className="cursor-pointer"
								onClick={() => setIsRegistering(false)}
							>
								Har du en bruker? Logg inn
							</p>
						</div>
					</>
				) : (
					<>
						<h1 className="text-2xl font-bold">Logg inn</h1>
						<div className="flex flex-col gap-2">
							<input
								className="border-2 border-black rounded w-52 p-2 focus:outline-none"
								placeholder="Email"
								type="text"
								disabled={loading}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<input
								className="border-2 border-black rounded w-52 p-2 focus:outline-none"
								placeholder="Password"
								type="password"
								disabled={loading}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<button
								className="border-2 border-black p-2 w-52 rounded focus:outline-none"
								disabled={loading}
								onClick={() => {
									setLoading(true);

									const emailRegex =
										/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
									if (!emailRegex.test(email)) {
										setLoading(false);
										return toast.error("Ugyldig email!");
									}

									signIn("credentials", {
										email: email,
										password: password,
										redirect: false,
									}).then((callback) => {
										setLoading(false);
										console.log(callback);
										if (callback.error) {
											return toast.error(
												"Feil email eller passord!"
											);
										}
										if (callback?.ok) {
											toast.success(
												"Logged in successfully!"
											);
											router.push("/");
										}
									});
								}}
							>
								Logg inn
							</button>
							<p
								className="cursor-pointer"
								onClick={() => setIsRegistering(true)}
							>
								Har du ikke en bruker? Lag en
							</p>
						</div>
					</>
				)}
			</div>
		</main>
	);
}
