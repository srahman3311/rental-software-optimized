import { useState, useEffect } from "react";


function useSearch(searchText) {

    const [tableData, setTableData] = useState(null);
    
  
    useEffect(() => {

        const apiData = JSON.parse(localStorage.getItem("apiData"));
    
        // Filter data based on searchText. When searchText is empty string filteredData will be 
        const filteredData = apiData.filter(item => {
    
            const name = item.name.toLowerCase();
            const code = item.code.toLowerCase();
            
            // searchText was updated after lowercasing it inside SearchInputField component
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

    return tableData;

}


export default useSearch;
