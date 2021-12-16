import styles from "./Result.module.css";

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
      <h3>{isBook ? "Book" : "Return"} a product</h3>
      {rentPeriod >= minimum_rent_period ? (
        <h3>Your estimate price is :{price * rentPeriod} </h3>
      ) : (
        <div>
          Minimum rent period is : {minimum_rent_period}.{<br />} You
          should select days more than minimum rent period
        </div>
      )}

      <div className={styles.Confirmation}>
        <button onClick={() => setShowModal(false)}>No</button>
        <button
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
