import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress, Modal } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

type Props = {
	open: boolean;
	setOpen: (open: boolean) => void;
	email: string;
};

const TodoModal = (props: Props) => {
	const [todo, setTodo] = useState("");
	const [loading, setLoading] = useState(false);
	return (
		<Modal
			disableAutoFocus
			open={props.open}
			onClose={() => props.setOpen(false)}
		>
			<div className="w-full h-full flex items-center justify-center">
				{loading ? (
					<div>
						<CircularProgress />
					</div>
				) : (
					<div>
						<div className="w-96 h-96 fixed flex items-start justify-end p-5 pointer-events-none">
							<FontAwesomeIcon
								icon={faCircleXmark}
								size="2x"
								className="cursor-pointer pointer-events-auto"
								onClick={() => props.setOpen(false)}
							/>
						</div>
						<div className="w-96 h-96 bg-white rounded p-10 flex flex-col justify-center gap-5">
							<h1 className="font-bold text-2xl">Foreslå noe!</h1>
							<input
								className="border-2 border-black p-3 rounded w-full focus:outline-none"
								placeholder="Hva burde gjøres?"
								type="text"
								onChange={(e) => setTodo(e.target.value)}
								disabled={loading}
							/>
							<button
								disabled={loading}
								className="border-2 border-black p-3 rounded w-fit focus:outline-none"
								onClick={() => {
									setLoading(true);
									axios
										.post("/api/createTodo", {
											todo: todo,
											email: props.email,
										})
										.then(() => {
											toast.success("Forslag sendt inn!");
											props.setOpen(false);
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
								Send inn forslag
							</button>
							<p className="text-gray-400 text-sm">
								Når du sender inn ett forslag må en
								administrator godkjenne den før den ender opp på
								listen.
							</p>
						</div>
					</div>
				)}
			</div>
		</Modal>
	);
};

export default TodoModal;
