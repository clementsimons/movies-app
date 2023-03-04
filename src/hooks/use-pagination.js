import { useState, useEffect, useCallback } from "react";

const usePagination = () => {

    const [items, setItems] = useState([]);
    const [paginatedItems, setPaginatedItems] = useState([]);
    const [maxItems, setMaxItems] = useState(10);
    const [totalPages, setTotalPages] = useState(10);
    const [selectedPage, setSelectedPage] = useState(1);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const paginateListItems = useCallback((items, maxItems) => {
        const newPaginatedItems = items.map((item, index) => {
            return {
                ...item,
                pagination: {
                    page: Math.ceil((index + 1) / maxItems),
                    totalPages: Math.ceil(items.length / maxItems)
                }
            }
        });
        setPaginatedItems(newPaginatedItems);
        setTotalPages(Math.ceil(items.length / maxItems));
    }, []);

    useEffect(() => {
        selectedCategories.length === 0 ? 
        paginateListItems(items, maxItems)
        : paginateListItems(items.filter(item => selectedCategories.includes(item.category)), maxItems)
        setCategories(Array.from(new Set(items.map(item => item.category))))
      }, [paginateListItems, items, selectedCategories, maxItems])

    return {
        items,
        paginatedItems,
        setItems,
        maxItems,
        setMaxItems,
        totalPages,
        selectedPage,
        setSelectedPage,
        categories,
        selectedCategories,
        setSelectedCategories
    }
}

export default usePagination;