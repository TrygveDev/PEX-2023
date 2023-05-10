import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import userSchema from "../../schema/userSchema";

if (mongoose.modelNames().includes("User")) {
	var dbUser = mongoose.model("User");
} else {
	dbUser = mongoose.model("User", userSchema);
}
mongoose.connect(process.env.DB_URL);

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password)
					throw new Error("Please enter your credentials");

				const user = await dbUser.findOne({ email: credentials.email });

				if (!user) throw new Error("Invalid credentials");

				const isCorrectPassword = await bcrypt.compare(
					credentials.password,
					user.password
				);

				if (!isCorrectPassword) throw new Error("Invalid credentials");

				return user as any;
			},
		}),
	],
	pages: {
		signIn: "/profile",
	},
	debug: process.env.NODE_ENV === "development",
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async session({ session }) {
			const user = await dbUser.findOne({ email: session.user.email });
			const userObj = {
				email: user.email,
				isAdmin: user.isAdmin,
			};
			session.user = userObj;

			return session;
		},
	},
});

export { handler as GET, handler as POST };
