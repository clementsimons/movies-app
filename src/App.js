import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from './pages/Error/Error';
import HomePage from './pages/Home/Home';
import MovieDetailsPage from './pages/MovieDetails/MovieDetails';
import RootLayout from './pages/Root/Root';
import FavoriteListPage from './pages/FavoriteList/FavoriteList';

import './App.css';

const router = createBrowserRouter([
    { 
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {  path: "/", element: <HomePage /> },
            {  path: "/favorites-list", element: <FavoriteListPage /> },
            {  path: "/movie-details/:id", element: <MovieDetailsPage /> }
        ]
    }
]);

const App = () => {
    return (
        <RouterProvider router={router} />            
    );
}

export default App;
