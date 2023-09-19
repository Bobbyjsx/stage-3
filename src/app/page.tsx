"use client"
import Central from "./components/module/Home";
import SearchInput from "./components/common/SearchInput";

const Home = () => {
	return (
		<div className="w-full py-10 flex flex-col justify-center items-center gap-y-6 bg-gray-200">
			<h2 className="text-2xl font-sans text-zinc-700 w-[70%] font-bold ">
				Image Gallery
			</h2>
			<div className="flex w-[70%] justify-between items-center">
				<p className="text-md font-sans text-gray-600 sm:flex hidden">
					Search images by tags
				</p>
				<section className="w-full sm:w-1/2">
					<SearchInput />
				</section>
			</div>

			<div className="w-full sm:mt-4">
				<Central />
			</div>
		</div>
	);
};

export default Home;
