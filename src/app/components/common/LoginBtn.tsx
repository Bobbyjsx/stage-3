"use client"
import { useSession, signIn, signOut } from "next-auth/react";
import { LoadingSpinner } from "./LoadingSpinner";

const LoginBtn = () => {
	const { data: session, status } = useSession();
	if (status === "loading") {
		return (
			<>
				<LoadingSpinner className=" w-8 h-8" />
			</>
		);
	}
	if (session) {
		return (
			<div className="flex gap-x-5">
				<p>Signed in as {session?.user?.name}</p>
				<button onClick={() => signOut()}>Sign Out</button>   
			</div>
		);
	}
	return (
		<div className="gap-x-5 flex">
			<p className="">Not signed in</p>
			<button
				onClick={() => signIn()}
				className="text-sm font-semibold leading-6 text-white gap-x-5">
				Sign In <span aria-hidden="true">&rarr;</span>
			</button>
		</div>
	);
};

export default LoginBtn;
