import React, { useState, useEffect } from "react";
import DataTable from "./Components/DataTable/DataTable";
import data from "./data/data.json";
import Loading from "./Components/reuseable-components/Loading";

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!localStorage.getItem("apiData")) {

      localStorage.setItem("apiData", JSON.stringify(data));

      return setLoading(false);
      
    } 

    setLoading(false);

  }, []);


  // Rafez - If we want to make this application scalable then we must use react-router-dom and define routes here.

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

}



export default App;
