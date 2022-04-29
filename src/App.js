import "./App.css";
import React, { useEffect, useState } from "react";
import Silo from "./components/Silo";
import request from "./utils/axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const [siloData, setSiloData] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const getData = () => {
    request.get("/get-data").then((res) => {
      console.log(res.data);
      if (res.data.status === "success") {
        setSiloData(res.data.data || []);
      }
    });
  };

  useEffect(() => {
    getData();
    const interval = setInterval(getData, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="App">
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {siloData.map((item) => (
        <Silo data={item} />
      ))}
    </div>
  );
}

export default App;
