"use client";
import { useState,useEffect } from 'react';

import { BasicTable } from './tables/BasicTable';
import { TableWithFilter } from './tables/TableWithFilter';

const TableWithHeader = ({MockData,loading,error}) => {

 
  return (
    <div style={{overflowY:"scroll"}}>
     
     {/* <BasicTable/> */}
     <TableWithFilter MockData={MockData}  loading={loading} error={error}/>
    </div>
  )
}

export default TableWithHeader;
