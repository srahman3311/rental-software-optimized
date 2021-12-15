import React, { useState, useEffect } from "react";
import useDate from "../../hooks/useDate";
import Select from "react-select";

import DatePicker from "../UI/DatePicker/DatePicker";
import styles from "./BookProduct.module.css";
import Modal from "../UI/Modal/Modal";
import Result from "../Result/Result";

const BookProduct = ({ data, setShowMainModal }) => {
  
  const [mileage, setMileage] = useState();
  // date state
  const [startDate, setStartDate] = useState(new Date()); // Today as default
  const [endDate, setEndDate] = useState(new Date(new Date().valueOf() + 1000 * 60 * 60 * 24)); // Tomorrow as default
  const days = useDate(startDate, endDate)
  // dropdown state
  const [selectedProduct, setSelectedProduct] = useState("");
  const [options, setOptions] = useState([]);
  const repairOptions = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];
 
  const [needsRepair, setNeedsRepair] = useState(false);

  // result modal state
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState(null);

 

  useEffect(() => {
    if (data) {
      const tempArray = [];
      data.forEach((element) => {
        tempArray.push({ value: element.code, label: element.name });
      });

      setOptions([...tempArray]);
    }
  }, [data]);


  // Don't need to place the codes inside useEffect hook. Not using useEffect hook will save us one re-render
  function handleSelect (value) {

    if(typeof value === "boolean") return setNeedsRepair(value);

    setSelectedProduct(value);

    data.forEach(item => {

      const { code, type, mileage } = item;

      if(code === value) setResult(item);

      if(code === value && type.includes("meter")) setMileage(mileage);

    });

  }


  const updateStorage = () => {

    if (data) {
      let updatedData = data;
      for (let index = 0; index < updatedData.length; index++) {
        if (updatedData[index].code === selectedProduct) {
          if (needsRepair) {
            updatedData[index].needing_repair = needsRepair;
          }
          break;
        }
      }
      localStorage.setItem("apiData", JSON.stringify(updatedData));
      setMileage();
      setSelectedProduct("");
      setNeedsRepair(false);
    }
  };

  console.log(startDate);

  

  return (
    <div className={styles.BookProduct}>
      <h3>Book a product</h3>
      <div className={styles.Dropdown}>
        <Select
          placeholder="Select product"
          options={options}
          onChange = {item => handleSelect(item.value)}
        />
      </div>
      <div className={styles.Dropdown}>
        <Select
          placeholder="Need to Repair"
          options={repairOptions}
          onChange = {item => handleSelect(item.value)}
        />
      </div>
      <DatePicker
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      {mileage ? <h4>Mileage: {mileage}</h4> : null}
      <div className={styles.Confirmation}>
        <button onClick={() => setShowModal(prevState => !prevState)}> No</button>
        <button onClick={() => setShowModal(true)}>Yes</button>
      </div>

      <Modal show={showModal}>
        <Result
          isBook
          result={{ ...result, days }}
          days={days}
          setShowModal = {setShowModal}
          setShowMainModal = {setShowMainModal}
          updateStorage={updateStorage}
        />
      </Modal>
    </div>
  );
};

export default BookProduct;
