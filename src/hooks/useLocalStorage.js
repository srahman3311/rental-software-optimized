import { useState, useEffect } from "react";


function useLocalStorage(searchText) {

    const [data, setData] = useState(null);
    const [tableData, setTableData] = useState(null);
  
    useEffect(() => {

        const apiData = JSON.parse(localStorage.getItem("apiData"));

        setData(apiData);
    
        // Filter data based on searchText. When searchText is empty string filteredData will be 
        const filteredData = apiData.filter(item => {
    
            const name = item.name.toLowerCase();
            const code = item.code.toLowerCase();
    
            return name.includes(searchText) || code.includes(searchText);
    
        });
    
        // We need to make a reuseable table so data must be formatted to feed into it
        const dataForTable = [];
        
        filteredData.forEach(item => {

            const {
                code, 
                name, 
                durability,
                mileage,
                availability,
                needing_repair,
                max_durability
            } = item;

            dataForTable.push({
                id: code,
                data: [
                    code,
                    name,
                    availability ? "True" : "False",
                    needing_repair ? "True" : "False",
                    durability / max_durability,
                    mileage

                ]
            });
    
        });
        
        setTableData(dataForTable);

    }, [searchText]); 

    return { data, tableData };

}


export default useLocalStorage;
