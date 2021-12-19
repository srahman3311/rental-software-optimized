import { useState, useEffect } from "react";


function useLocalStorage() {

    const [data, setData] = useState(null);
    const [bookableProductOptions, setBookableProductOptions] = useState([]);
    const [returnableProductOptions, setReturnableProductOptions] = useState([]);
  
    useEffect(() => {

        const apiData = JSON.parse(localStorage.getItem("apiData"));

        setData(apiData);

        // For react-select's options
        const bookableProductOptionsArray = [];
        const returnableProductOptionsArray = [];

        apiData.forEach((item) => {

            if(item.availability) bookableProductOptionsArray.push({ value: item.code, label: item.name });

            if(!item.availability) returnableProductOptionsArray.push({ value: item.code, label: item.name });

        });

       
        setBookableProductOptions(bookableProductOptionsArray);
        setReturnableProductOptions(returnableProductOptionsArray);
        

    }, []); 

    return { data, bookableProductOptions, returnableProductOptions };

}


export default useLocalStorage;
