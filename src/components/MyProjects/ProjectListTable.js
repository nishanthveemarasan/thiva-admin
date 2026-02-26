import React from "react";
import { CTableRow, CTableDataCell } from "@coreui/react";
import ATable from "../UI/ATable/ATable";
import { cilPencil, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import Pagination from "../UI/ATable/Pagination";

const ProjectListTable = ({ header, tableData, edit, remove, onChange }) => {
  const rowData = tableData.data;
  return <>
   
      <ATable header={header}>
        {rowData.map((row, index) => {
          return (
            <CTableRow key={row.uuid}>
              <CTableDataCell className="text-center">{index+1}</CTableDataCell>
              <CTableDataCell className="text-center">{row.name}</CTableDataCell>
              <CTableDataCell className="text-center">{row.type}</CTableDataCell>
              <CTableDataCell className="text-center">{row.city}</CTableDataCell>
              <CTableDataCell className="text-center">
                <CIcon
                  icon={cilPencil}
                  size="sm"
                  style={{ color: 'green' }}
                  className="me-2"
                  onClick={() => edit(row)}
                />
                <CIcon
                  icon={cilTrash}
                  size="sm"
                  style={{ color: 'red' }}
                  onClick={() => remove(row.uuid)}
                />
              </CTableDataCell>
            </CTableRow>
          )
        })}
      </ATable>
      <Pagination
        to={tableData.meta.to}
        total={tableData.meta.total}
        links={tableData.meta.links}
        change={onChange}
      />
  </>;
};
export default ProjectListTable;
