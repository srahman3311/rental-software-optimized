import React, { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { tableHeaders } from "../../libs/data";
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
  const { data, tableData } = useLocalStorage(searchText);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("book_product");

  function displayHideModal(event) {

    setModalType(event.target.value);
    setShowModal(prevState => !prevState);

  }

  const children = 
    modalType === "book_product" ? 
    <BookProduct data={data} setShowMainModal = {setShowModal} /> : 
    <ReturnProduct data={data} setShowMainModal = {setShowModal} />;



  return (
    <div className={styles.container}>
      <div className={styles.tableCon}>
        <SearchInputField setSearchText = {setSearchText} />
        <table>
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
