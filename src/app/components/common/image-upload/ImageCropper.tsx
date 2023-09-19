"use client";
import React, { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
// import { Area, Point } from "react-easy-crop/types";
import { Button } from "../Button";
import { getOrientation } from "get-orientation/browser";
import {
	getCroppedImg,
	getRotatedImage,
	readFile,
} from "../../../lib/canvasUtils";

import { Modal } from "../Modal";

type ImageCropperProps = {
	onClose: () => void;
	onChange: (file: File) => void;
	aspectRatio?: number;
	file: File;
};

const minZoom = 0.1;
const defaultPoint = { x: 0, y: 0 };
const defaultArea = { height: 0, width: 0, x: 0, y: 0 };

const ORIENTATION_TO_ANGLE: Record<string, number> = {
	"3": 180,
	"6": 90,
	"8": -90,
};

export const ImageCropper = ({
	onClose,
	onChange,
	aspectRatio = 4 / 3,
	file,
}: ImageCropperProps) => {
	const [imageSrc, setImageSrc] = useState<string | null>(null);
	const [crop, setCrop] = useState(defaultPoint);
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] =
		useState(defaultArea);

	useEffect(() => {
		(async () => {
			let imageDataUrl = await readFile(file);

			try {
				const orientation = await getOrientation(file);

				const rotation = ORIENTATION_TO_ANGLE[orientation];
				if (rotation) {
					imageDataUrl = await getRotatedImage(
						imageDataUrl,
						rotation
					);
				}
			} catch (e) {
				console.warn("failed to detect the orientation");
			}
			setImageSrc(imageDataUrl);
		})();
	}, [file]);

	const cropAndSaveImage = useCallback(async () => {
		if (!imageSrc) {
			return;
		}

		try {
			const croppedImage = await getCroppedImg(
				imageSrc,
				croppedAreaPixels,
				file
			);
			onChange(croppedImage);
		} catch (e) {
			console.error(e);
		}
	}, [croppedAreaPixels, imageSrc, onChange, file]);

	const onCropComplete = useCallback(
		(
			_: {
				height: number;
				width: number;
				x: number;
				y: number;
			},
			croppedAreaPixels: {
				height: number;
				width: number;
				x: number;
				y: number;
			}
		) => {
			setCroppedAreaPixels(croppedAreaPixels);
		},
		[]
	);

	if (!imageSrc) {
		return null;
	}

	return (
		<Modal
			isOpen={true}
			modalContainerClassName="w-screen h-screen sm:h-[90%] sm:w-[1000px]"
			setIsOpen={onClose}>
			<div className="fixed left-0 top-0 flex h-full w-full flex-col">
				<div className="flex h-20 items-center border-b border-gray-900/10 px-7 text-left text-base font-medium leading-7">
					<h3 className="mt-3 py-3.5 text-xl font-medium">
						Crop Image
					</h3>
				</div>
				<div className="flex-1 overflow-y-auto px-7 py-5">
					<div className="pt-5">
						<div className="relative flex min-h-[60vh] flex-col py-5">
							<div className="relative">
								<div className="relative top-0 h-96 flex-1">
									<Cropper
										aspect={aspectRatio}
										crop={crop}
										image={imageSrc}
										minZoom={minZoom}
										onCropChange={setCrop}
										onCropComplete={
											onCropComplete
										}
										onZoomChange={setZoom}
										restrictPosition={false}
										zoom={zoom}
									/>
								</div>
								<div className="pt-8">
									<div className="mx-auto w-full max-w-2xl">
										<div>Zoom</div>
										<input
											aria-labelledby="Zoom"
                      title="zoom"
											className="h-3 w-full appearance-none rounded-2xl border-b-4 border-t-4 border-b-white border-t-white bg-purple-200 transition-all "
											max={3}
											min={0.1}
											onChange={(e) => {
												const zoomValue = e
													?.target
													?.value as unknown as number;
												setZoom(zoomValue);
											}}
											step={0.1}
											type="range"
											value={zoom}
										/>
									</div>
									<div className="mt-5 flex w-full justify-center space-x-4 py-5 ">
										<Button
											intent="neutral"
											onClick={onClose}
											title="Cancel"
											type="button"
										/>
										<Button
											onClick={cropAndSaveImage}
											title="Save"
											type="button"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};
