"use client"
import { useApiCache } from "@/app/Hooks/useApiCache";
import { useSearchParams } from "next/navigation";
import { LoadingSpinner } from "../common/LoadingSpinner";
import Dnd from "./dnd";
import { API_KEY } from "@/app/Hooks/useApiCache";


const Central = () => {
	const searchParams = useSearchParams();
    const search = searchParams.get("search");
    const path = search
		? `/api/?key=${API_KEY}&q=${search}&image_type=photo&pretty=true`
        : `/api/?key=${API_KEY}&image_type=photo&pretty=true`;
    
    const { data: images, isLoading:loadingImages } = useApiCache<ApiResult>(path, true, true);
    
    if (loadingImages) {
       return (
			<div className="w-full flex flex-col justify-center items-center h-[70vh]">
				{" "}
				<LoadingSpinner className="w-24 border-t-indigo-700" />
			</div>
		); 
    }
    return (
		<div>
			<Dnd initialImages={images.hits} />
		</div>
	);
};

export default Central;
