import React from 'react';

const MoviesContext = React.createContext({
    items: [],
    removeItem: (id) => {},
    setMaxItems: (number) => {}
})

export default MoviesContext;