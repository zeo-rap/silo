import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Chart from "./Chart";
import request from "../utils/axios";

import "./silo.scss";
import { set } from "date-fns";

function Silo({ data }) {
  //const [siloData, setSiloData] = useState(props.data);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [chartInterval, setChartInterval] = React.useState(3);
  const [chartData, setChartData] = useState(null);
  const [validations, setValidations] = useState({ start: true, end: true });
  const handleChange = (event) => {
    setChartInterval(event.target.value);
  };
  const getChartData = () => {
    const queryParams = { name: data.name, start: startDate, end: endDate, interval: chartInterval };
    const queryString = new URLSearchParams(queryParams).toString();
    request.get(`/get-graph?${queryString}`).then((res) => {
      console.log(res.data);
      if (res.data.status === "success") {
        setChartData(res.data.data || null);
      }
    });
  };
  return (
    <>
      <div className="silo">
        <div className="silo__box__container">
          <p className="silo__title">{data.name}</p>
          <div className="silo__box">
            <div
              className="silo__box__level"
              style={{
                height: data.level ? data.level * 2 : 0,
                backgroundColor: data.level <= 30 ? "#f0140c" : data.level >= 70 ? "#1da32f" : "#cfcfcf",
              }}
            ></div>
          </div>
          <span className="silo__level">%{data.level}</span>
        </div>
        <div className="silo__graph">
          <div>
            <p className="silo__graph__title">Graph Settings:</p>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start date"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                  setValidations((prev) => ({ ...prev, start: true }));
                }}
                renderInput={(params) => (
                  <TextField {...params} helperText={!validations.start && "Select a start date"} />
                )}
                format="DD-MM-YYYY"
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="End date"
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                  setValidations((prev) => ({ ...prev, end: true }));
                }}
                renderInput={(params) => (
                  <TextField {...params} helperText={!validations.end && "Select an end date"} />
                )}
                format="DD-MM-YYYY"
                minDate={startDate}
              />
            </LocalizationProvider>
          </div>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label" sx={{ fontSize: "18px", fontWeight: 600 }}>
              Select a time interval:
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              onChange={handleChange}
              value={chartInterval}
              sx={{ flexDirection: "row" }}
            >
              <FormControlLabel value="3" control={<Radio />} label="3 Hours" />
              <FormControlLabel value="6" control={<Radio />} label="6 Hours" />
              <FormControlLabel value="12" control={<Radio />} label="12 Hours" />
              <FormControlLabel value="24" control={<Radio />} label="24 Hours" />
            </RadioGroup>
          </FormControl>
          <Button
            onClick={() => {
              setValidations({ start: !!startDate, end: !!endDate });
              if (startDate && endDate) {
                getChartData();
              }
            }}
            variant="contained"
          >
            Confirm
          </Button>
        </div>
      </div>
      <div>{chartData && <Chart data={chartData} />}</div>
    </>
  );
}

export default Silo;
