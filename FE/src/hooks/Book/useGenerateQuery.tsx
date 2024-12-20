import { useMemo } from "react";

import useBookStore from "@/stores/bookStore";

const useGenerateQuery = () => {
    const { searchText, size, sort, order, selectedValue, keyword} =
        useBookStore();

    const queryString = useMemo(() => {
        const queryParams = {
            ...(searchText && { [selectedValue.value]: searchText }),
            pageSize: size,
            ...(sort && { sort }),
            ...(order && { order }),
            ...(keyword.length > 0 && { keyword: keyword.join(";") }),
            exactMatch: false,
        };
    
        return Object.entries(queryParams)
            .map(([key, value]) => `${key}=${value}`)
            .join("&");
    }, [searchText, selectedValue.value, size, sort, order, keyword]);
    console.log(queryString)
    return queryString;
};

export default useGenerateQuery;
