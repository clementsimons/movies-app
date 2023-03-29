import { Outlet } from "react-router-dom";
import Header from "../../components/UI/Header/Header";

import styles from "./Root.module.css";

const RootLayout = () => {
    return <>
        <Header />
        <main className={styles.content} >
            <Outlet />
        </main>
    </>
}

export default RootLayout