"use client";
import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;



const get = async <T,>(path: string, search:boolean) => {
	// https://pixabay.com/api/?key=39539350-8bc9fe08f807adba8cbff8cd9&image_type=photo&pretty=true
	const url = search ? BASE_URL + path : BASE_URL + path + `/?key=${API_KEY}&image_type=photo&pretty=true`;
	try {
		const response = await axios.get(url);
		if (response.status !== 200) {
			throw new Error(
				`Request failed with status: ${response.status}`
			);
		}
		return response.data; // Parse response as JSON
	} catch (error) {
		throw error;
	}
};

export const useApiCache = <T,>(url: string, enabled = true, search=false) => {
	const queryClient = useQueryClient();

	const { data, error, isLoading } = useQuery({
		enabled,
		queryKey: [url],
		queryFn: () => {
			return get<T>(url, search);
		},
	});

	const refresh = useCallback(() => {
		queryClient.invalidateQueries([url]);
	}, [queryClient, url]);

	const updateUrl = (newUrl: string) => {
		// Invalidate the old query and update the URL
		queryClient.invalidateQueries([url]);
		// Note: You cannot directly update 'url' as it's a function argument, so you may need to manage it in your component's state.
	};

	return { data, error, isLoading, refresh, updateUrl };
};
