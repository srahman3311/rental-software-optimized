import React, { useState, useEffect } from "react";
import DataTable from "./Components/DataTable/DataTable";
import data from "./data/data.json";
import Loading from "./Components/reuseable-components/Loading";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    // if (!localStorage.getItem("apiData")) {

    //   localStorage.setItem("apiData", JSON.stringify(data));

    //   setLoading(false);

    // } else {

    //   setLoading(false);
      
    // }



    // Correction to the above if else block - we don't need an else block, avoiding it will make the codes more readable. 
    // We can simply return from the if block if there is no data in the localStorage
    if (!localStorage.getItem("apiData")) {

      localStorage.setItem("apiData", JSON.stringify(data));

      return setLoading(false);
      
    } 

    setLoading(false);

  }, []);

  return (
    <div>
      {
        loading 
        ? 
        <Loading />
        : 
        <div className="content">
          <DataTable />
        </div>
      }
    </div>
  );

  // return (
  // <div>
  //   {
  //   loading ? <div>Loading ... </div> : <DataTable />}
    
  //   </div>);
}



export default App;
