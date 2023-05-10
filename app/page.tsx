"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "./components/Navbar";
import { faCirclePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import TodoModal from "./components/TodoModal";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { CircularProgress } from "@mui/material";

type Todo = {
	todo: string;
	email: string;
};

export default function Home() {
	const router = useRouter();
	const { data: session, status } = useSession();
	const [todoModalOpen, setTodoModalOpen] = useState(false);
	const [todos, setTodos] = useState<Todo[]>();

	useEffect(() => {
		axios
			.get("/api/getTodos")
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
		<>
			<TodoModal
				open={todoModalOpen}
				setOpen={setTodoModalOpen}
				email={session?.user.email}
			/>
			<main className="w-screen h-screen">
				{/* @ts-ignore */}
				<Navbar isAdmin={session?.user.isAdmin} />
				<div className="w-full flex">
					<div className="w-full p-20">
						<div className="flex items-center gap-10">
							<div>
								<h1 className="text-2xl font-bold">
									Forslagskasse
								</h1>
								<p>Alle forslag som er godkjent av admin.</p>
							</div>
							<div>
								<FontAwesomeIcon
									icon={faCirclePlus}
									className="text-blue-600 cursor-pointer"
									size="3x"
									onClick={() => setTodoModalOpen(true)}
								/>
							</div>
						</div>
						<div className="w-full flex flex-wrap overflow-y-scroll gap-3 pt-5">
							{todos ? (
								todos.map((todo, i) => (
									<div
										key={i}
										className="w-96 h-fit flex flex-col rounded border-2 border-black p-3"
									>
										<div className="w-full h-full flex items-center">
											{todo.todo}
										</div>
										<div className="w-full min-h-full flex items-center text-gray-400 text-sm">
											<p>{todo.email}</p>
										</div>
										{/* @ts-ignore */}
										{session?.user.isAdmin && (
											<div className="w-96 h-fit flex items-center justify-end pr-5 absolute pointer-events-none">
												<FontAwesomeIcon
													icon={faCircleXmark}
													color="red"
													className="absolute pointer-events-auto"
													onClick={() => {
														axios
															.post(
																"/api/rejectTodo",
																{
																	todo: todo,
																}
															)
															.then((res) => {
																setTodos(
																	(value) =>
																		value.filter(
																			(
																				_,
																				index
																			) => {
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
																console.log(
																	err
																);
																toast.error(
																	"En intern feil oppstod! Kunne ikke fjerne forslaget."
																);
															});
													}}
												/>
											</div>
										)}
									</div>
								))
							) : (
								<CircularProgress />
							)}
							{todos?.length === 0 && (
								<p>Det er ingen godkjente forslag!</p>
							)}
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
