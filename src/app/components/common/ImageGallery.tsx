"use client";
import React, { useState } from "react";
import { Reorder } from "framer-motion";

type Image = {
	id: number;
	src: string;
	alt: string;
};

type ImageGalleryProps = {
	images: Image[];
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
	const [galleryImages, setGalleryImages] =
		useState<Image[]>(images);

	// 	return (
	// 		<>
	// 			<Reorder
	// 				initial={galleryImages.map((image) => image.id)}
	// 				onUpdate={(newOrder:Image[]) => {
	// 					// Reorder the images based on the newOrder array
	// 					const newGallery = newOrder.map((id, index) =>
	// 						galleryImages.find((image) => image.id === id)
	// 					);
	// 					setGalleryImages(newGallery);
	// 				}}>
	// 				{galleryImages.map((image) => (
	// 					<div key={image.id}>
	// 						<img
	// 							src={image.src}
	// 							alt={image.alt}
	// 							style={{
	// 								width: "20%",
	// 								cursor: "grab", // Add cursor: grab for a draggable effect
	// 							}}
	// 						/>
	// 					</div>
	// 				))}
	// 			</Reorder>
	// 		</>
	// 	);
	// };

	const [items, setItems] = useState([0, 1, 2, 3]);

	return (
		<Reorder.Group
			axis="y"
			values={galleryImages}
			onReorder={setGalleryImages}>
			{galleryImages.map((item) => (
				<Reorder.Item
					// className="grid grid-cols-3"
					key={item.id}
					value={item.id}>
					<img
						src={item.src}
						alt={item.alt}
						style={{
							width: "20%",
							cursor: "grab",
						}}
					/>
				</Reorder.Item>
			))}
		</Reorder.Group>
	);
};
     
export default ImageGallery;
