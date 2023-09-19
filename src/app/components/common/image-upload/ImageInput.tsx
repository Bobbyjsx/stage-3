"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { PhotoIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";

import { ImageCropper } from "./ImageCropper";

const accept = {
	"image/*": [".png", ".jpeg", ".jpg"],
};

type ImageInputProps = {
	onChange: (selected: (string | File)[]) => void;
	maxFiles?: number;
	value?: (string | File)[];
	label?: string;
	error?: string;
	uploadComponent?: React.ReactNode;
	aspectRatio?: number;
	isMultiple?: boolean;
	disabled?: boolean;
};

export const ImageInput = ({
	onChange = () => {},
	disabled,
	value = [],
	label,
	error,
	maxFiles = 4,
	uploadComponent,
	aspectRatio = 4 / 3,
	isMultiple = true,
}: ImageInputProps) => {
	const [newFile, setNewFile] = useState<File | null>(null);

	const onDrop = useCallback(async (files: File[]) => {
		if (files) {
			const file = files[0];
			setNewFile(file);
		}
	}, []);

	const isDisabled = disabled || maxFiles === value?.length;

	const {
		getRootProps,
		getInputProps,
		isDragActive,
		fileRejections,
	} = useDropzone({
		accept,
		disabled: isDisabled,
		maxFiles: 1,
		multiple: false,
		noClick: true,
		onDrop,
	});

	const handleCroppedImage = (croppedFile: File) => {
		const newImages = isMultiple
			? [...value, croppedFile]
			: [croppedFile];
		onChange(newImages);
		setNewFile(null);
	};

	const getUploadComponent = () => {
		if (uploadComponent) {
			return (
				<label {...getRootProps()}>
					{uploadComponent}
					<input
						disabled={!!disabled}
						hidden
						{...getInputProps()}
					/>
				</label>
			);
		}

		return (
			<label
				className={classNames(
					"mt-2 flex justify-center rounded-lg border border-dashed px-6 py-10",
					{
						"border-gray-900/25": !isDragActive,
						"border-purple-600": isDragActive,
						"border-red-600": error,
					}
				)}
				{...getRootProps()}>
				<div className="text-center">
					<PhotoIcon
						aria-hidden="true"
						className="mx-auto h-12 w-12 text-gray-300"
					/>
					<div className="mt-4 flex text-sm leading-6 text-gray-600">
						<label
							className="relative cursor-pointer rounded-md bg-white font-semibold text-purple-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-purple-600 focus-within:ring-offset-2 hover:text-purple-500"
							htmlFor="file-upload">
							<span>Click</span>
							<input
								className="sr-only"
								disabled={isDisabled}
								id="file-upload"
								name="file-upload"
								type="file"
								{...getInputProps()}
								accept="image/png, image/jpg, image/jpeg"
							/>
						</label>
						<p className="pl-1">
							or drag and drop an image
						</p>
					</div>
					<p className="text-xs leading-5 text-gray-600">
						PNG, JPG
					</p>
				</div>
			</label>
		);
	};

	return (
		<div className="w-full">
			<div className="col-span-full">
				{label && (
					<label
						className="block text-sm font-medium leading-6 text-gray-900"
						htmlFor="images">
						{label}
					</label>
				)}
				{getUploadComponent()}
			</div>
			{newFile && (
				<ImageCropper
					aspectRatio={aspectRatio}
					file={newFile}
					onChange={handleCroppedImage}
					onClose={() => setNewFile(null)}
				/>
			)}
			<div>
				{fileRejections.map((fileRejection) => {
					return fileRejection.errors.map((fileError) => (
						<p
							className="mt-2 text-sm text-red-600"
							key={fileError.code}>
							{fileError.message}
						</p>
					));
				})}
				{error && (
					<p
						className="mt-2 text-sm text-red-600"
						id="error">
						{error}
					</p>
				)}
			</div>
		</div>
	);
};
