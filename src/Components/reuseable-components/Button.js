import styles from "./Button.module.css";

function Button({ text, value, clickHandler }) {

    return (
        <button 
            className={styles.button}
            value = {value}
            onClick = {clickHandler}
        >
            {text}
        </button>
    );

}

export default Button;