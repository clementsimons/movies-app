import styles from "./Error.module.css";

const Error = ({message}) => {
    return <>
        <main className={styles.content} >
            <h1>An error occured</h1>
            <p>{message}</p>
        </main>
    </>
}

export default Error;