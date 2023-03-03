import React, { useEffect, useCallback } from "react";

// Fake data
import { movies$ } from "../../fakeData/movies-fake-data";

// Custom hooks
import usePagination from "../../hooks/use-pagination";

// Context
import MoviesContext from "./movies-context";

const MoviesProvider = ({ children }) => {

    const { 
        items,
        paginatedItems,
        setItems: setMovies, 
        setMaxItems,
        totalPages,
        selectedPage,
        setSelectedPage,
        categories,
        selectedCategories,
        setSelectedCategories
    } = usePagination();

    const listItemsFilteredByCategory = selectedCategories.length === 0 ? paginatedItems : paginatedItems.filter(item => selectedCategories.includes(item.category));
    const listItemsFilteredByPage =  listItemsFilteredByCategory.filter(item => item.pagination.page === selectedPage);
    const filteredItems = listItemsFilteredByPage;

    const fetchMovies = useCallback(async() => {
        const moviesList = await movies$.then(response => response);
        setMovies(moviesList);
        setMaxItems(4);
    }, [setMovies, setMaxItems]);

    // // Effects
    useEffect(() => {
        fetchMovies();
    }, [fetchMovies])

    const removeMovie = (id) => {};

    const movieContext = {
        items,
        filteredItems,
        selectedPage,
        totalPages,
        categories,
        selectedCategories,
        setMovies,
        removeItem: removeMovie,
        setMaxItems,
        setSelectedPage,
        setSelectedCategories
    }

    return <MoviesContext.Provider value={movieContext} >
        {children}
    </MoviesContext.Provider>
}

export default MoviesProvider;