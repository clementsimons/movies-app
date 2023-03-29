import { buildUrl } from "../helpers/url-helpers";
import { movieActions } from "./movie-slice";
import { uiActions } from "./ui-slice";

export const fetchMoviesData = (parameters) => {
    return async (dispatch) => {
        const fetchData = async (fetchAllData = false) => {
            const response = await fetch(buildUrl(parameters));
            if( !response.ok ){
                throw new Error("Could not fetch data.")
            }

            if(fetchAllData){
                const data = await response.json()
                const totalResults = data.totalResults;
                const totalPages = Math.ceil(totalResults / 10);
                const allMoviesData = [];
                for (let page = 1; page <= totalPages; page++) {
                    const response = await fetch(buildUrl({ ...parameters, page }));
                    if( !response.ok ){
                        throw new Error("Could not fetch data.")
                    }
                    const data = await response.json();
                    allMoviesData.push(...data.Search);
                }
                const formattedItems = allMoviesData.map(movie => {
                    return {
                        id: movie.imdbID,
                        title: movie.Title,
                        year: movie.Year,
                        poster: movie.Poster
                    }
                });

                return {
                    items: formattedItems,
                    allItems: true
                };
            } else {
                const data = await response.json();
                const formattedItems = data.Search.map(movie => {
                    return {
                        id: movie.imdbID,
                        title: movie.Title,
                        year: movie.Year,
                        poster: movie.Poster
                    }
                });
    
                return {
                    items: formattedItems,
                    allItems: false
                };
            }

        }

        try {
            dispatch(uiActions.resetError());
            dispatch(movieActions.loadAllItems({allItems: false}));
            const moviesData = await fetchData();
            dispatch(movieActions.replaceItems({
                items: moviesData.items || []
            }))
            const allMoviesData = await fetchData(true);
            dispatch(movieActions.replaceItems({
                items: allMoviesData.items || []
            }))
            dispatch(movieActions.loadAllItems({allItems: true}));
        } catch (error) {
            console.log(error);
            dispatch(uiActions.showError({ message: error.message }));
        }
    }
};

export const sortMoviesByYear = (movies, order) => {
    return async (dispatch) => {
        let sortedMovies = [ ...movies ];
        if(order === "asc"){ 
            sortedMovies = await sortedMovies.sort((a, b) => a.year - b.year ) 
        } else {
            sortedMovies = await sortedMovies.sort((a, b) => b.year - a.year ) 
        }
        dispatch(movieActions.replaceItems({ items: sortedMovies }))
    }
}

export const sortMoviesByYearRange = (movies, range) => {
    return async (dispatch) => {
        try {
            dispatch(uiActions.resetError());
            let sortedMovies = [ ...movies ];
            if( range[0] || range[1] ){
                if( range[1] < range[0] ){
                    throw new Error("Could not sort movies. First date must be inferior than second one.");
                }
                sortedMovies = await sortedMovies.filter((movie) => movie.year >= range[0] && movie.year <= range[1]);
                dispatch(movieActions.replaceSortedItems({ items: sortedMovies }))
            } else {
                throw new Error("Could not sort movies. You need to enter two dates.");
            }
        } catch (error) {
            console.log(error);
            dispatch(uiActions.showError({ message: error.message }));
        }
    }
}

export const getItem = (id) => {
    return async (dispatch) => {
        const getData = async() => {
            const response = await fetch(buildUrl(id));
            if( !response.ok ){
                throw new Error("Could not fetch data.")
            }
            const item = await response.json();
            const formattedItem = {
                id: item.imdbID,
                title: item.Title,
                year: item.Year,
                plot: item.Plot,
                director: item.Director,
                actors: item.Actors,
                poster: item.Poster
            }

            return { item: formattedItem };
        }
        try {
            const item = await getData();
            dispatch(movieActions.updateItem(item))
        } catch (error) {
            dispatch(uiActions.showError({ message: error.message }));
        }
    }
}