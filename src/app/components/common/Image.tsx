"use client";
import Image from "next/image";
import { ImageInput } from "./ImageInput";
import { Button } from "./Button";
import {
	Controller,
	FormProvider,
	useForm,
} from "react-hook-form";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { PreviewImageFile } from "./PreviewImageFile";

type Image = { logo?: string | undefined };

export default function Images() {
	const formMethods = useForm<Image>({ values: { logo: "" } });

	const {
		control,
		register,
		formState: { errors },
		reset,
		handleSubmit,
		watch,
		setValue,
	} = formMethods;

	const onSubmit = async (formData: Image) => {
		try {
			// Handle form submission here
			console.log(formData);
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<FormProvider {...formMethods}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Controller
						control={control}
						name="logo"
						render={({ field: { onChange, value } }) => (
							<div className="mt-2 flex items-center">
								{value ? (
									<div className="relative mr-3 aspect-[16/9] w-40 overflow-hidden rounded-md">
										<PreviewImageFile
											alt="logo"
											className="aspect-[16/9] w-40 object-cover transition-all duration-100 hover:scale-105"
											file={
												value as unknown as File
											}
										/>
									</div>
								) : (
									<PhotoIcon
										aria-hidden="true"
										className="mr-3 h-16 w-16 rounded-md text-gray-300"
									/>
								)}
								<div>
									<ImageInput
										aspectRatio={16 / 9}
										isMultiple={false}
										onChange={(
											file: (File | string)[]
										) => onChange(file[0])}
										uploadComponent={
											<Button
												className="cursor-pointer"
												intent="neutral"
												type="button"
												useDiv>
												{value
													? "Change"
													: "Upload"}
											</Button>
										}
										value={value ? [value] : []}
									/>
								</div>
							</div>
						)}
					/>
					<Button
						title="Save"
						type="submit"
					/>
				</form>
			</FormProvider>
		</main>
	);
}
