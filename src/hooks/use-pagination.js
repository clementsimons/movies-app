import { useState, useCallback } from "react";

const usePagination = () => {

    const [paginatedItems, setPaginatedItems] = useState([]);
    const [maxItems, setMaxItems] = useState(10);
    const [selectedPage, setSelectedPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const paginateListItems = useCallback((items) => {
        const newPaginatedItems = items.map((item, index) => {
            return {
                ...item,
                pagination: {
                    page: Math.ceil((index + 1) / maxItems)
                }
            }
        });
        setPaginatedItems(newPaginatedItems);
        setTotalPages(Math.ceil(items.length / maxItems));
        setSelectedPage(1);
    }, [maxItems]);

    return {
        paginatedItems,
        paginateListItems,
        setMaxItems,
        selectedPage,
        setSelectedPage,
        setTotalPages,
        totalPages
    }
}

export default usePagination;