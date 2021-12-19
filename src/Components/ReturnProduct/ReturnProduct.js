import React, { useState, useEffect } from "react";
import useDate from "../../hooks/useDate";
import Select from "react-select";

import DatePicker from "../UI/DatePicker/DatePicker";
import styles from "./ReturnProduct.module.css";
import buttonStyles from "../reuseable-components/Button.module.css";
import Modal from "../UI/Modal/Modal";
import Result from "../Result/Result";
import Header from "../reuseable-components/Header";

const ReturnProduct = ({ 
  selectedProductInfo,
  setShowMainModal, 
  options, 
  repairOptions,
  handleSelect,
  updateStorage 
}) => {
  

  // result modal state
  const [showModal, setShowModal] = useState(false);
  
  // date state
  const [startDate, setStartDate] = useState(new Date()); // Today as default
  const [endDate, setEndDate] = useState(new Date(new Date().valueOf() + 1000 * 60 * 60 * 24)); // Tomorrow as default
  const rentPeriod = useDate(startDate, endDate);



  return (
    <div className={styles.BookProduct}>
      <Header text = "Return a product" />
      <div className={styles.Dropdown}>
        <Select
          placeholder="Select product"
          options={options}
          onChange={item => handleSelect(item.value)}
         
        />
      </div>
      <div className={styles.Dropdown}>
        <Select
          placeholder="Need to Repair"
          options={repairOptions}
          onChange={item => handleSelect(item.value)}
        />
      </div>
      <DatePicker
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      {selectedProductInfo.mileage ? <h4>Previous mileage: {selectedProductInfo.mileage}</h4> : null}
      {selectedProductInfo.mileage ? <h4>Mileage increase after return: {rentPeriod * 10}</h4> : null}
      <div className={styles.Confirmation}>
        <button 
          className = {buttonStyles.yes_no_button}
          onClick={() => setShowModal(prevState => !prevState)}
        >
          No
        </button>
        <button className = {buttonStyles.yes_no_button} onClick={() => setShowModal(true)}>Yes</button>
      </div>

      <Modal show={showModal}>
        <Result
          rentPeriod = {rentPeriod}
          selectedProductInfo = {selectedProductInfo}
          setShowMainModal = {setShowMainModal}
          setShowModal = {setShowModal}
          updateStorage={updateStorage}
        />
      </Modal>
    </div>
  );
};

export default ReturnProduct;
