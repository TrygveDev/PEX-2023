import mongoose from "mongoose";
import { NextResponse } from "next/server";
import userSchema from "../schema/userSchema";
import bcrypt from "bcrypt";

if (mongoose.modelNames().includes("User")) {
	var dbUser = mongoose.model("User");
} else {
	dbUser = mongoose.model("User", userSchema);
}

mongoose.connect(process.env.DB_URL);

export async function POST(request: Request) {
	const body = await request.json();
	const { email, password } = body;

	const hashedPassword = await bcrypt.hash(password, 10);
	const newUser = new dbUser({ email: email, password: hashedPassword });
	const user = await newUser.save();

	return NextResponse.json(user);
}
