import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";

interface ImageProps {
	image: ImageData;
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
				className="w-72 h-56 overflow-hidden rounded-xl">
				<Image
					alt={`img - ${image.id}`}
					src={image.webformatURL}
					className="w-full h-full object-cover object-center"
					width={1000}
					height={1000}
				/>
			</div>
		);
};

interface ImageListProps {
	images: ImageData[];
	moveImage:
		| ((dragIndex: number, hoverIndex: number) => void)
		| undefined;
}

const ImageList: React.FC<ImageListProps> = ({
  images,
  moveImage,
}) => {
  const renderImage = (
    image: ImageData,
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

  // if images are null
  if (!images || images.length === 0) {
	  return (
			<div className="w-full flex flex-col justify-center items-center h-[70vh] gap-y-7">
				<p className="text-xl font-semibold font-serif">
					Oopss! Image not found.
				</p>
				<Link href="/" className="bg-yellow-500 border-2 border-yellow-800 text-black rounded-md px-6 py-2 font-serif">Go back</Link>
			</div>
		);
  }

  return (
    <section className="file-list md:w-[70%] w-[90%] mx-auto bg-white px-3 py-5 rounded-md">
      <div className=" grid md:grid-cols-3 grid-cols-1 gap-5 place-items-center">
        {images.map(renderImage)}
      </div>
    </section>
  );
};

export default ImageList;
