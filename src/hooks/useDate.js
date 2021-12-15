import { useState, useEffect } from "react";

function useDate(startDate, endDate) {

    const [days, setDays] = useState(1);


    useEffect(() => {

        const startDateTime = startDate.getTime();

        const endDateTime = endDate.getTime();
        
        const numberOfDays = Math.abs(Math.floor((endDateTime - startDateTime) / (1000 * 3600 * 24)))
        
        setDays(numberOfDays);

    }, [startDate, endDate]);

    
    return days;

}



export default useDate;