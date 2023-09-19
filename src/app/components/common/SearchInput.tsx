import { Input } from "./Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import classNames from "classnames";

	type SubmitProps = {
			search: string;
    };
        
const SearchInput = () => {
    	const pathName = usePathname();
		const router = useRouter();

	
		const {
			register,
			handleSubmit,
			formState: { errors, isSubmitting },
        } = useForm<SubmitProps>();
    
	const submit: SubmitHandler<SubmitProps> = (values) => {
		router.push(`/?search=${values.search}`);
	};
	return (
		<form
			className="w-full grid place-self-stretch items-center "
			onSubmit={handleSubmit(submit)}>
			<Input
				placeholder="Search for an image :)"
				{...register("search", { required: true })}
				className="bg-transparent border-2 border-white w-full"
				trailingIcon={
					<button
						disabled={isSubmitting}
						type="submit"
						title="search">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							className="w-6 h-6">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
							/>
						</svg>
					</button>
				}
			/>
		</form>
	);
};

export default SearchInput;
