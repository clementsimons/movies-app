import { useSelector } from "react-redux";
import FavoriteList from "../../components/Favorites/FavoriteList/FavoriteList";

import styles from "./FavoriteList.module.css";

const FavoriteListPage = () => {

    const favoriteList =  useSelector(state => state.favorite.items);

    return (
        <>
            {
                favoriteList.length > 1 ?
                <FavoriteList />
                : <div className={styles["no-content"]} >You have no favorites in your favorite list</div>
            }
        </>
    )
}

export default FavoriteListPage;