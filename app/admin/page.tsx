"use client";

import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
	faCheck,
	faCheckCircle,
	faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Todo = {
	todo: string;
	email: string;
};

export default function Admin() {
	const router = useRouter();
	const { data: session, status } = useSession();
	const [todos, setTodos] = useState<Todo[]>();

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
				<p>Alle forslag som må godkjennes av en admin.</p>
				<div className="w-full flex flex-wrap overflow-y-scroll gap-8 pt-5">
					{todos ? (
						todos.map((todo, i) => (
							<div key={i} className="flex flex-row gap-2">
								<div className="w-96 h-fit flex flex-col rounded border-2 border-black p-3">
									<div className="w-full h-full flex items-center">
										{todo.todo}
									</div>
									<div className="w-full min-h-full flex items-center text-gray-400 text-sm">
										<p>{todo.email}</p>
									</div>
								</div>
								<div className="flex flex-col justify-between">
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
																	index !== i
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
																	index !== i
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
			</div>
		</main>
	);
}
