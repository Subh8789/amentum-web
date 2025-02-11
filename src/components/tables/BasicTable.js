"use client"
import { useTable, useSortBy, useGlobalFilter,usePagination } from "react-table";
import { MockData } from "./MockData.js";
import { COLUMNS } from "./Column";
import { useMemo } from "react";
import "./Table.css";
import { GlobalFilter } from "./GlobalFilter.js";

export const BasicTable = () => {
    console.log("mockdata", MockData);
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MockData, []);

    const {
        getTableProps,
        headerGroups,
        getTableBodyProps,
        //rows,
        page , // page for pagination
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
    } = useTable({
        columns,
        data
    }, useGlobalFilter, useSortBy,usePagination);

    const { globalFilter } = state;

    const {pageIndex,pageSize} = state;

    return (
      <>
      <h3>Drop-Off</h3>
        <div className="table-container">
            <GlobalFilter filter={globalFilter} setFiter={setGlobalFilter} />
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => {
                                const columnProps = column.getHeaderProps(column.getSortByToggleProps());
                                return (
                                    <th key={column.id} {...columnProps}>
                                        {column.render('Header')}
                                        <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr key={row.id} {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td key={cell.column.id} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="pagination-container">
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong> {' '}
                </span>
                <span>
                    | Go to page: {" "}
                    <input type="number" defaultValue={pageIndex+1}
                      onChange={(e)=>{
                        const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(pageNumber)
                    }}
                    style={{width:"50px"}}
                    />
                </span>
                    <select value={pageSize} onChange={(e)=>setPageSize(Number(e.target.value))}>
                    {
                        [10,25,50].map(pageSize=>(
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))
                    }
                    </select>

                <button onClick={()=>gotoPage(0)} disabled={!canPreviousPage}>{"<<"}</button>
                <button onClick={()=>previousPage()} disabled={!canPreviousPage}>Previous</button>
                <button onClick={()=>nextPage()} disabled={!canNextPage}>Next</button>
                <button onClick={()=>gotoPage(pageCount - 1)} disabled={!canNextPage}>{">>"}</button>

            </div>
        </div>
      </>
    );
}
