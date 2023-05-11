import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";

type Props = {
	session: any;
	todo: any;
	i: number;
	loading: any;
	setLoading: any;
	setTodos: any;
};

const handleDelete = (props: any) => {
	props.setLoading({
		value: true,
		i: props.i,
	});
	axios
		.post("/api/rejectTodo", {
			todo: props.todo,
		})
		.then((res) => {
			props.setTodos((value: any) =>
				value.filter((_: any, index: any) => {
					return index !== props.i;
				})
			);
			toast.success("Forslaget ble fjernet!");
		})
		.catch((err) => {
			console.log(err);
			toast.error("En intern feil oppstod! Kunne ikke fjerne forslaget.");
		})
		.finally(() =>
			props.setLoading({
				value: false,
				i: 0,
			})
		);
};

const TodoItem = (props: Props) => {
	return (
		<div
			className={`w-96 h-fit flex flex-col rounded border-2 ${
				props.session?.user.email === props.todo.email
					? "border-gray-400"
					: "border-black"
			} p-3`}
		>
			{props.loading.value && props.loading.i === props.i ? (
				<CircularProgress />
			) : (
				<>
					<div className="w-full h-full flex items-center overflow-hidden">
						{props.todo.todo}
					</div>
					<div className="w-full min-h-full flex items-center text-gray-400 text-sm">
						<p className="w-full">{props.todo.email}</p>
					</div>
					{/* @ts-ignore */}
					{(props.session?.user.isAdmin === true ||
						props.session?.user.email === props.todo.email) && (
						<div className="w-96 h-fit flex items-center justify-end pr-5 absolute pointer-events-none">
							<FontAwesomeIcon
								icon={faCircleXmark}
								color="red"
								className="absolute pointer-events-auto"
								onClick={() => handleDelete(props)}
							/>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default TodoItem;
