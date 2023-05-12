"use client";

import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
	faCheckCircle,
	faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCSVReader } from "react-papaparse";

type Todo = {
	todo: string;
	email: string;
};

export default function Admin() {
	const router = useRouter();
	const { data: session, status } = useSession();
	const [todos, setTodos] = useState<Todo[]>();
	const [file, setFile] = useState<any>();
	const { CSVReader } = useCSVReader();
	const [disabled, setDisabled] = useState(true);

	useEffect(() => {
		axios
			.get("/api/unapprovedTodos")
			.then((res: any) => {
				setTodos(res.data);
			})
			.catch((err: any) => {
				toast.error(
					"En intern feil oppstod! Kunne ikke hente forslag."
				);
				console.log(err);
			});
	}, []);

	return status === "unauthenticated" ? (
		router.push("/login")
	) : (
		<main className="w-screen h-screen">
			{/* @ts-ignore */}
			<Navbar isAdmin={session?.user.isAdmin} />
			<div className="w-full p-20">
				<h1 className="text-2xl font-bold">Admin</h1>
				<div className="w-full flex">
					<div className="w-1/2 flex flex-wrap overflow-y-scroll gap-8">
						<p>Alle forslag som må godkjennes av en admin:</p>
						{todos ? (
							todos.map((todo, i) => (
								<div
									key={i}
									className="flex flex-row gap-2 h-fit"
								>
									<div className="w-96 h-fit flex flex-col rounded border-2 border-black p-3 overflow-hidden">
										<div className="w-full h-full flex items-center">
											{todo.todo}
										</div>
										<div className="w-full min-h-full flex items-center text-gray-400 text-sm">
											<p className="w-full">
												{todo.email}
											</p>
										</div>
									</div>
									<div className="flex flex-col justify-evenly">
										<FontAwesomeIcon
											icon={faCheckCircle}
											color="green"
											size="2x"
											className="pointer-cursor"
											onClick={() => {
												axios
													.post("/api/approveTodo", {
														todo: todo,
													})
													.then((res) => {
														setTodos((value) =>
															value.filter(
																(_, index) => {
																	return (
																		index !==
																		i
																	);
																}
															)
														);
														toast.success(
															"Forslaget ble godkjent!"
														);
													})
													.catch((err) => {
														console.log(err);
														toast.error(
															"En intern feil oppstod! Kunne ikke godkjenne forslaget."
														);
													});
											}}
										/>

										<FontAwesomeIcon
											icon={faXmarkCircle}
											color="red"
											size="2x"
											className="pointer-cursor"
											onClick={() => {
												axios
													.post("/api/rejectTodo", {
														todo: todo,
													})
													.then((res) => {
														setTodos((value) =>
															value.filter(
																(_, index) => {
																	return (
																		index !==
																		i
																	);
																}
															)
														);
														toast.success(
															"Forslaget ble fjernet!"
														);
													})
													.catch((err) => {
														console.log(err);
														toast.error(
															"En intern feil oppstod! Kunne ikke fjerne forslaget."
														);
													});
											}}
										/>
									</div>
								</div>
							))
						) : (
							<CircularProgress />
						)}
						{todos?.length === 0 && (
							<p>Ingen forslag trengs å godkjennes!</p>
						)}
					</div>
					<div className="w-1/2 flex flex-col gap-2">
						<p>Lag mange brukere på en gang:</p>
						<CSVReader
							onUploadAccepted={(results: any) => {
								setFile(results.data);
								setDisabled(false);
							}}
						>
							{({ getRootProps, acceptedFile }: any) => (
								<>
									<div>
										<button
											className="border-2 border-black p-3 rounded"
											type="button"
											{...getRootProps()}
										>
											Last opp CSV-fil
										</button>
										<div className="mb-2">
											{acceptedFile
												? acceptedFile.name
												: "Ingen fil lastet opp"}
										</div>
										<button
											className="border-2 border-black p-3 rounded disabled:cursor-not-allowed disabled:opacity-50"
											type="button"
											disabled={disabled}
											onClick={async () => {
												if (!file)
													return toast.error(
														"Ingen fil lastet opp!"
													);
												let index = 0;
												await file.forEach(
													(user: any) => {
														index++;
														const email = user[0];
														const emailRegex =
															/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
														if (
															!emailRegex.test(
																email
															)
														)
															return;
														const password = email;

														axios
															.post(
																"/api/register",
																{
																	email: email,
																	password:
																		password,
																}
															)
															.then(() => {})
															.catch((err) => {
																toast.error(
																	"En intern feil oppstod!"
																);
																console.log(
																	err
																);
															});
													}
												);
												toast.success(
													"Brukere opprettet!"
												);
												setDisabled(true);
											}}
										>
											Oprett brukere
										</button>
									</div>
								</>
							)}
						</CSVReader>
					</div>
				</div>
			</div>
		</main>
	);
}
