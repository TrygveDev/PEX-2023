import Link from "next/link";
import React from "react";

type Props = {
	isAdmin?: boolean;
};

const Navbar = (props: Props) => {
	return (
		<div className="w-full h-20 bg-black flex justify-between items-center text-white">
			<div className="w-1/2 p-10">
				<Link href="/">
					<h1 className="text-4xl font-bold">
						Bedrift Forslagskasse
					</h1>
				</Link>
			</div>
			<div className="w-1/2 p-10 flex justify-evenly">
				<Link href="/">
					<div>Forslags Kassen</div>
				</Link>
				<Link href="/about">
					<div>Om</div>
				</Link>
				<Link href="/profile">
					<div>Profil</div>
				</Link>
				{props.isAdmin && (
					<Link href="/admin">
						<div>Admin</div>
					</Link>
				)}
			</div>
		</div>
	);
};

export default Navbar;
