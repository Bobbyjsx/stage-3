"use client";
import React, { useState } from "react";
import ImageList from "./components/common/ImageList";
// import LoginBtn from "./components/common/LoginBtn";
import { signIn, useSession } from "next-auth/react";

const Home = () => {
	const { data: session, status } = useSession();

	const initialImages = [
		{ id: 111, src: "/assets/dbstructure.png" },
		{
			id: 222,
			src: "https://images.unsplash.com/photo-1695014192162-e1d282ff5b40?ixid=M3w1MDQxNzB8MHwxfGFsbHw5fHx8fHx8Mnx8MTY5NTExMzMxMHw\u0026ixlib=rb-4.0.3",
		},
		{ id: 555, src: "/assets/cryp.jpeg" },
		{
			id: 1,
			src: "https://images.unsplash.com/photo-1687360441387-0179af118555?ixid=M3w1MDQxNzB8MXwxfGFsbHwxfHx8fHx8Mnx8MTY5NTExMzMxMHw\u0026ixlib=rb-4.0.3",
		},
		{
			id: 2,
			src: "https://images.unsplash.com/photo-1694807865565-70252084fa27?ixid=M3w1MDQxNzB8MHwxfGFsbHwyfHx8fHx8Mnx8MTY5NTExMzMxMHw\u0026ixlib=rb-4.0.3",
		},
		{
			id: 3,
			src: "https://images.unsplash.com/photo-1694687530321-7ecd3c9163b1?ixid=M3w1MDQxNzB8MHwxfGFsbHwzfHx8fHx8Mnx8MTY5NTExMzMxMHw\u0026ixlib=rb-4.0.3",
		},
		{
			id: 4,
			src: "https://images.unsplash.com/photo-1693917566028-c0f204817a97?ixid=M3w1MDQxNzB8MHwxfGFsbHw0fHx8fHx8Mnx8MTY5NTExMzMxMHw\u0026ixlib=rb-4.0.3",
		},
		{
			id: 5,
			src: "https://images.unsplash.com/photo-1694930102174-d6e808bbfadf?ixid=M3w1MDQxNzB8MHwxfGFsbHw1fHx8fHx8Mnx8MTY5NTExMzMxMHw\u0026ixlib=rb-4.0.3",
		},
		{
			id: 6,
			src: "https://images.unsplash.com/photo-1694875464862-978a879a1210?ixid=M3w1MDQxNzB8MHwxfGFsbHw4fHx8fHx8Mnx8MTY5NTExMzMxMHw\u0026ixlib=rb-4.0.3",
		},
		{
			id: 7,
			src: "https://images.unsplash.com/photo-1695010811495-d7b9eba38584?ixid=M3w1MDQxNzB8MHwxfGFsbHwxMHx8fHx8fDJ8fDE2OTUxMTMzMTB8\u0026ixlib=rb-4.0.3",
		},
		{
			id: 8,
			src: "https://images.unsplash.com/photo-1682685796467-89a6f149f07a?ixid=M3w1MDQxNzB8MXwxfGFsbHw2fHx8fHx8Mnx8MTY5NTExMzMxMHw\u0026ixlib=rb-4.0.3",
		},
		{
			id: 9,
			src: "https://images.unsplash.com/photo-1694930104640-27f3091c2a34?ixid=M3w1MDQxNzB8MHwxfGFsbHw3fHx8fHx8Mnx8MTY5NTExMzMxMHw\u0026ixlib=rb-4.0.3",
		},
	];

	const [images, setImages] = useState(initialImages);

	const moveImages = (dragIndex: number, hoverIndex: number) => {
		//  if (!session) {
		// 	 // If the user is not authenticated, display an alert or prompt to sign in
		// 	   alert("Please sign in to use drag-and-drop.");
		// 		signIn()
		// 		return;
		// 	}
		const newImages = [...images];
		const draggedImage = newImages[dragIndex];
		
		// Reorder the images array based on drag and drop
		newImages.splice(dragIndex, 1);
		newImages.splice(hoverIndex, 0, draggedImage);

		setImages(newImages);
	};

	return (
		<main className="flex flex-col">
      {/* <LoginBtn/> */}
			<ImageList
				images={images}
				moveImage={moveImages }
			/>
			
		</main>
	);
};

export default Home;
