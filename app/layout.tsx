import Providers from "./components/Providers";
import "./globals.css";
import { Roboto } from "next/font/google";
import ToasterProvider from "./providers/ToasterProvider";

const inter = Roboto({
	subsets: ["latin"],
	weight: "400",
});

export const metadata = {
	title: "PEX-2023",
	description: "PEX-2023",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<ToasterProvider />
					{children}
				</Providers>
			</body>
		</html>
	);
}
