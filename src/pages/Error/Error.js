import { NavLink } from "react-router-dom";
import Header from "../../components/UI/Header/Header"
import styles from "./Error.module.css";

const ErrorPage = () => {
    return <>
        <Header />
        <main className={styles.content} >
            <h1>An error occured</h1>
            <p>Could not find this page!</p>
            <NavLink to="/" end >Back to movies list</NavLink>
        </main>
    </>
}

export default ErrorPage;