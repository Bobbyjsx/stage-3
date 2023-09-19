"use client";
import MovieCard from "@/app/components/common/MovieCard";
import { useApiCache } from "@/app/hooks/useApiCache";
import Loading from "@/app/loading";
import { useSearchParams } from "next/navigation";

const Search = () => {
	const searchParams = useSearchParams();
	const search = searchParams.get("search");

	const { data: searchResult, isLoading } = useApiCache(
		`/search/movie?query=${search}`
	);
	console.log(searchResult);
	
	if (isLoading) {
		return (
			<>
				<Loading />
			</>
		);
	}
	return (
		<main className="flex flex-col justify-center items-center w-full mx-auto">
			<div className="flex items-center mx-auto w-full py-10">
				<div className="flex justify-between mx-auto md:w-[80%] w-[90%]">
					<h1 className="font-sans font-semibold text-xl md:text-3xl">
						SEARCH RESULTS FOR:
					</h1>
					<p className="font-sans font-bold md:text-lg text-md text-rose-700  uppercase ">
						{search}
					</p>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-4 place-items-center gap-20">
				{searchResult?.results?.map((tile: Movie) => {
					return (
						<div
							className="w-full mx-auto"
							key={tile.id}>
							<MovieCard movieDetails={tile}  />
						</div>
					);
				})}
			</div>
		</main>
	);
};

export default Search;
