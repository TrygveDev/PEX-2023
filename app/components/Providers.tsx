"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

const Providers = (props: Props) => {
	return <SessionProvider>{props.children}</SessionProvider>;
};

export default Providers;
