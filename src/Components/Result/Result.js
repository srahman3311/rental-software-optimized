import styles from "./Result.module.css";
import buttonStyles from "../reuseable-components/Button.module.css";
import Header from "../reuseable-components/Header";

const Result = ({
  isBook,
  rentPeriod,
  selectedProductInfo,
  setShowMainModal,
  setShowModal,
  updateStorage,
}) => {

  const { price, minimum_rent_period } = selectedProductInfo;

  return (
    <div>
      <Header text = {isBook ? "Book a product" : "Return a product"} />
      {rentPeriod >= minimum_rent_period ? (
        <Header text = {`Your estimate price is :${price * rentPeriod}`} />
      ) : (
        <div style={{textAlign: "center"}}>
          Minimum rent period is : {minimum_rent_period}.{<br />} You
          should select days more than minimum rent period
        </div>
      )}

      <div className={styles.Confirmation}>
        <button className={buttonStyles.yes_no_button} onClick={() => setShowModal(false)}>No</button>
        <button
          className={buttonStyles.yes_no_button}
          onClick={() => {
            setShowModal(false);
            setShowMainModal(prevState => !prevState)
            updateStorage(isBook ? "Book" : "Return", rentPeriod);
          }}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default Result;
