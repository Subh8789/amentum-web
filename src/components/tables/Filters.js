"use client";
import 'regenerator-runtime/runtime';

import { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

export const Filters = ({filter,setFilter,setDateRange,dateRange}) => {

    const [value, setValue] = useState(filter)

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");


    const onChange = useAsyncDebounce((value) => {
        setFilter(value || undefined)
    }, 1000)

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
        <div className="filters-container">
            {/* Search Box */}
            <input
                className="search-box"
                type="text"
                placeholder="Search..."
                value={value || ""}
                onChange={(e) => {
                    setValue(e.target.value)
                    onChange(e.target.value)
                }} />

            {/* Date Range Filters */}
            <label>Start Date:</label>
            <input
                type="date"
                className="date-input"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value )}
            />

            <label>End Date:</label>
            <input
                type="date"
                className="date-input"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value )}
            />

            {/* Buttons */}
            <button className="filter-button" onClick={handleFilter}>Apply</button>
            <button className="reset-button" onClick={handleReset}>Reset</button>
        </div>

    )
}
