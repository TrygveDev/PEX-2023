import mongoose from "mongoose";
import { NextResponse } from "next/server";
import todoSchema from "../schema/todoSchema";

if (mongoose.modelNames().includes("Todo")) {
	var dbTodo = mongoose.model("Todo");
} else {
	dbTodo = mongoose.model("Todo", todoSchema);
}

mongoose.connect(process.env.DB_URL);

export async function POST(request: Request) {
	const body = await request.json();
	const { todo, email } = body;
	const newTodo = new dbTodo({ todo: todo, email: email });
	const Todo = await newTodo.save();

	return NextResponse.json(Todo);
}
