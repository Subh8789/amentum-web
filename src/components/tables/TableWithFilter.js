"use client";
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
import { useMemo, useState } from "react";
//import { MockData } from "./MockData.js";
import { COLUMNS } from "./Column";
// import { GlobalFilter } from "./GlobalFilter.js";
// import { GlobalDateRange } from "./GlobalDateRange.js";
import { Filters } from "./Filters.js";
import "./Table.css";
import { useRouter } from "next/navigation";

export const TableWithFilter = ({MockData,loading,error}) => {
    //console.log("mockdata", MockData);

    const router = useRouter()

    const [selectedRows, setSelectedRows] = useState([]);
    const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
    
    const columns = useMemo(() => [
        {
            Header: 'Select',
            accessor: 'id',
            Cell: ({ row }) => (
                <input 
                    type="checkbox" 
                    className="checkbox"
                    checked={selectedRows.includes(row.original.id)}
                    onChange={() => handleCheckboxChange(row.original.id)}
                />
            ),
        },
        ...COLUMNS
    ], [selectedRows]);
    
    const handleCheckboxChange = (id) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
        console.log("selectedRows",selectedRows)
    };



    // Filter data based on date range
    const filteredData = useMemo(() => {
        if (!dateRange.startDate || !dateRange.endDate) return MockData;

        const start = new Date(dateRange.startDate);
        const end = new Date(dateRange.endDate);

        return MockData.filter((row) => {
            const rowDate = new Date(row.collectionDate); // Assuming "date" is a valid field in MockData
            return rowDate >= start && rowDate <= end;
        });
    }, [MockData,dateRange]);

    const data = useMemo(() => filteredData, [filteredData]);

    const {
        getTableProps,
        headerGroups,
        getTableBodyProps,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        prepareRow,
        setGlobalFilter
    } = useTable(
        { columns, data },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    // 

    const BASE_URL = "https://app.swglobalstaging.com";
    const POST_KEY = "f11e8d98b515c1d53290f3811bd01e5a2416a9315a8974d69cd939a1fce6b253"
    const UPDATE_API_URL = `${BASE_URL}/api/v1/waybill/track/appointments/update`;
    // 
    const sendToEmbassy = async () => {
        if (selectedRows.length === 0) {
            alert("Please select at least one application.");
            return;
        }

        try {
            const response = await fetch(UPDATE_API_URL, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "post-key": POST_KEY
                },
                body: JSON.stringify({
                    applications: selectedRows,
                    status: "Dropped-Off Sent To Embassy (1 & 3)"
                })
            });
            const result = await response.json();
            if (result.responseCode === 200 && result.success) {
                alert("Applications sent to embassy successfully.");
                setSelectedRows([]);
                router.push("/dropoff")

            } else {
                alert("Failed to update applications.");
            }
        } catch (error) {
            console.error("Error updating applications:", error);
            alert("An error occurred while updating applications.");
        }
    };

    // 


    const { globalFilter, pageIndex, pageSize } = state;
    
    return (
        <>
         {loading && <div className="loader">Loading...</div>}
         {!loading && !error && MockData && (
            <>
            <div className="table-header">
            <h3>Drop-Off</h3>
            <button  className="btn-header" onClick={()=>sendToEmbassy()}>Action</button>
            </div>
            <div className="table-container">
                <div className="table-header">
                    {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> */}
              {/* <GlobalDateRange setDateRange={setDateRange} dateRange={dateRange} /> */}
                    <Filters filter={globalFilter} setFilter={setGlobalFilter} setDateRange={setDateRange} dateRange={dateRange} />
                </div>

                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => {
                                    const columnProps = column.getHeaderProps(column.getSortByToggleProps());
                                    return (
                                        <th key={column.id} {...columnProps}>
                                            {column.render("Header")}
                                            <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                   { <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr key={row.id} {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <td key={cell.column.id} {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>}
                </table>

                {/* <div className="pagination-container">
                    <span>
                        Page <strong>{pageIndex + 1} of {pageOptions.length}</strong>
                    </span>
                    <span>
                        | Go to page: {" "}
                        <input type="number" defaultValue={pageIndex + 1}
                            onChange={(e) => {
                                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                                gotoPage(pageNumber);
                            }}
                            style={{ width: "50px" }}
                        />
                    </span>
                    <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                        {[10, 25, 50].map(size => (
                            <option key={size} value={size}>
                                Show {size}
                            </option>
                        ))}
                    </select>

                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{"<<"}</button>
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                    <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{">>"}</button>
                </div> */}
                <div className="pagination-container">
                    <button className="pagination-button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{"<<"}</button>
                    <button className="pagination-button" onClick={() => previousPage()} disabled={!canPreviousPage}>{"<"}</button>

                    {pageOptions.map((pageNumber) => (
                        <button
                            key={pageNumber}
                            className={`pagination-page ${pageIndex === pageNumber ? "active" : ""}`}
                            onClick={() => gotoPage(pageNumber)}
                        >
                            {pageNumber + 1}
                        </button>
                    ))}

                    <button className="pagination-button" onClick={() => nextPage()} disabled={!canNextPage}>{">"}</button>
                    <button className="pagination-button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{">>"}</button>
                </div>

            </div>
            </>
      )}
        </>
    );
};
