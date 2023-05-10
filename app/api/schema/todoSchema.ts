import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
	email: { type: String, required: true },
	todo: { type: String, required: true },
	date: { type: Date, default: Date.now },
	accepted: { type: Boolean, default: false },
});

export default todoSchema;
