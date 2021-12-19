import styles from "./Header.module.css";

function Header({ text }) {

    return (
        <h3 className={styles.header}>{text}</h3>
    );
}


export default Header;