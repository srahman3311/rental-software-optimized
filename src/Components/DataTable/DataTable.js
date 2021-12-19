import React, { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import useSearch from "../../hooks/useSearch";
import { tableHeaders, repairOptions } from "../../libs/data";

// Stylesheet
import tableStyles from "../reuseable-components/data-table/Table.module.css";

// Components
import BookProduct from "../BookProduct/BookProduct";
import ReturnProduct from "../ReturnProduct/ReturnProduct";
import Button from "../reuseable-components/Button";
import Modal from "../UI/Modal/Modal";
import TableHeader from "../reuseable-components/data-table/TableHeader";
import styles from "./DataTable.module.css";
import TableData from "../reuseable-components/data-table/TableData";
import LoadingTableData from "../reuseable-components/data-table/LoadingTableData";
import SearchInputField from "../reuseable-components/SearchInputField";


const DataTable = () => {


  // Change on searchText will cause component re-render, as this is being used a dependency inside useEffect 
  // hook's dependency array.  
  const [searchText, setSearchText] = useState("");
  
  // Custom hook calls
  const { data, bookableProductOptions, returnableProductOptions } = useLocalStorage();
  const tableData = useSearch(searchText);

  // Other states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("book_product");
  const [selectedProductInfo, setSelectedProductInfo] = useState({
    code: "",
    needing_repair: false,
    mileage: 0,
    price: 0,
    minimum_rent_period: 0,
  });

  function displayHideModal(event) {

    setModalType(event.target.value);
    setShowModal(prevState => !prevState);

  }

  function handleSelect(value) {

    console.log(value);

    if(typeof value === "boolean") {
      return setSelectedProductInfo(currentValue => {return { ...currentValue, needing_repair: value }});
    } 

    // Using for loop instead of forEach for performance boost. forEach will run till the last item but with for
    // loop we can break out of it once we have found our item.

    // Initializing len with the value of data.length, it will also boost the performance.
    const len = data.length;

    for(let x = 0; x < len; x++) {

      const { code, mileage, price, minimum_rent_period, needing_repair } = data[x];

      if(code === value) {

        setSelectedProductInfo(currentValue => {

          return {
            ...currentValue,
            code,
            needing_repair,
            mileage,
            price,
            minimum_rent_period
          }

        });

        break;

      };

    }
  }

  function updateStorage(actionType, rentPeriod) {

    const { code, needing_repair } = selectedProductInfo;

    if (data) {

      let updatedData = data;

      for (let index = 0; index < updatedData.length; index++) {

        const product = updatedData[index];

        if(product.code === code) {

          product.needing_repair = needing_repair;
          product.availability = false;

          // If function is invoked from return product modal
          if(actionType === "Return") {

            if(product.type === "plain") product.durability = product.durability - rentPeriod * 1;

            product.availability = true;
            product.durability = product.durability - (rentPeriod * 2);
            product.mileage = product.mileage + (rentPeriod * 10);

          }

          break;
        }

      }

      localStorage.setItem("apiData", JSON.stringify(updatedData));
      setSelectedProductInfo(currentValue => {

        return {
          ...currentValue,
          code: "",
          needing_repair: false,
          mileage: 0
        }

      });

      // Having some issues with react-select. After booking or returning, just booked or returned product 
      // still appears as the first value. So I think it's a better idea to refresh the page. 
      window.location.reload();
    }

  }


  const children = 
    modalType === "book_product" 
    ? 
    <BookProduct 
      selectedProductInfo = {selectedProductInfo} 
      setShowMainModal = {setShowModal}
      options = {bookableProductOptions} 
      repairOptions = {repairOptions}
      handleSelect = {handleSelect}
      updateStorage = {updateStorage}
    /> 
    : 
    <ReturnProduct 
      selectedProductInfo = {selectedProductInfo}
      setShowMainModal = {setShowModal} 
      options = {returnableProductOptions}
      repairOptions = {repairOptions}
      handleSelect = {handleSelect}
      updateStorage = {updateStorage}
    />;



  return (
    <div className={styles.container}>
      <div className={styles.tableCon}>
        <SearchInputField setSearchText = {setSearchText} />
        <table className={tableStyles.data_table}>
          <TableHeader tableHeaders={tableHeaders} />
          {!data ? <LoadingTableData /> : <TableData tableData={tableData} />}
        </table>
      </div>
      <div className={styles.buttonDiv}>
        <Button text = "Book" value = "book_product" clickHandler = {displayHideModal} />
        <Button text = "Return" value = "return_product" clickHandler = {displayHideModal} />
      </div>

      <Modal show={showModal}>{children}</Modal>
    </div>
  );
};

export default DataTable;
