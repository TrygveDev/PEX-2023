import mongoose from "mongoose";
import { NextResponse } from "next/server";
import todoSchema from "../schema/todoSchema";

if (mongoose.modelNames().includes("Todo")) {
	var dbTodo = mongoose.model("Todo");
} else {
	dbTodo = mongoose.model("Todo", todoSchema);
}

mongoose.connect(process.env.DB_URL);

export async function GET(request: Request) {
	const todos = await dbTodo.find({});

	const filteredTodos = todos.filter((todo) => todo.accepted === false);

	return NextResponse.json(filteredTodos);
}
