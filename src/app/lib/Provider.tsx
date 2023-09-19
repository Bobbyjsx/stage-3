"use client"
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import {
	DndProvider,
	TouchTransition,
	MouseTransition,
} from "react-dnd-multi-backend";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import {
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type LayoutProps = {
	children?: ReactNode;
	session?: any; 
};


export const HTML5toTouch = {
	backends: [
		{
			id: "html5",
			backend: HTML5Backend,
			transition: MouseTransition,
		},
		{
			id: "touch",
			backend: TouchBackend,
			options: { enableMouseEvents: true },
			preview: true,
			transition: TouchTransition,
		},
	],
};
export default function Provider({ children, session }: LayoutProps) {
const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider session={session}>
				<DndProvider options={HTML5toTouch}>
					{children}
				</DndProvider>
			</SessionProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
