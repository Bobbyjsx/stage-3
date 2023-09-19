import Image from "next/image";
import React, { useRef } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";

interface ImageProps {
	image: {
		id: number;
		src: string;
	};
	index: number;
	moveImage:
		| ((dragIndex: number, hoverIndex: number) => void)
		| undefined;
}

const type = "Image";

const Images: React.FC<ImageProps> = ({ image, index, moveImage }) => {
	const ref = useRef<HTMLDivElement>(null);

	const [, drop] = useDrop({
		accept: type,
		hover(item: { index: number }) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) {
				return;
			}
			moveImage && moveImage(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});

	const [{ isDragging }, drag, preview] = useDrag(() => ({
		type: type,
		item: { id: image.id, index },
		collect: (monitor: any) => ({
			isDragging: monitor.isDragging(),
		}),
	}));

	drag(drop(ref));

		return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0 : 1 }}
      className="w-full overflow-hidden"
    >
      <Image alt={`img - ${image.id}`} src={image.src} className="w-full h-full object-cover object-center" width={1000} height={1000} />
    </div>
  );
};

interface ImageListProps {
	images: {
		id: number;
		src: string;
	}[];
	moveImage:
		| ((dragIndex: number, hoverIndex: number) => void)
		| undefined;
}

const ImageList: React.FC<ImageListProps> = ({
	images,
	moveImage,
}) => {
	const renderImage = (
		image: { id: number; src: string },
		index: number
	) => {
		return image ? (
			<Images
				image={image}
				index={index}
				key={`${image.id}-image`}
				moveImage={moveImage}
			/>
		) : null;
	};
	return (
		<section className="file-list w-full">
			<div className=" grid md:grid-cols-3 grid-cols-1 gap-5 place-items-center">
				{images.map(renderImage)}
			</div>
		</section>
	);
};

export default ImageList;
