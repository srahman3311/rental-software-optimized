import { useState, useEffect } from "react";


function useLocalStorage() {

    const [data, setData] = useState(null);
    const [options, setOptions] = useState(null);
  
    useEffect(() => {

        console.log("hi");

        const apiData = JSON.parse(localStorage.getItem("apiData"));

        setData(apiData);

        // For react-select's options
        const optionsArray = [];

        apiData.forEach((item) => {

            optionsArray.push({ value: item.code, label: item.name });

        });

        setOptions([...optionsArray]);

    }, []); 

    return { data, options };

}


export default useLocalStorage;
