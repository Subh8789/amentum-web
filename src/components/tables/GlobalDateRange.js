"use client";
import { useState } from "react";

export const GlobalDateRange = ({ setDateRange }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Apply filter function
  const handleFilter = () => {
    setDateRange({ startDate, endDate });
  };

  // Reset filter function
  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setDateRange({ startDate: "", endDate: "" });
  };

  return (
    <div className="date-range-container">
      <label>Start Date: </label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      
      <label>End Date: </label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <button onClick={handleFilter}>Apply</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};
