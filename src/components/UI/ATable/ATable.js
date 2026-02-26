import React from 'react'
import { CTable, CTableHead, CTableRow, CTableBody, CTableHeaderCell } from '@coreui/react'
import classes from './table.module.css'

const ATable = ({ header, children }) => {
  return (
    <CTable>
      <CTableHead color="dark">
        <CTableRow>
          {header.map((title, index) => {
            return (
              <CTableHeaderCell className={classes.tableHead} scope="col" key={index}>
                {title}
              </CTableHeaderCell>
            )
          })}
        </CTableRow>
      </CTableHead>
      <CTableBody className={classes.tableBody}>{children}</CTableBody>
    </CTable>
  )
}
export default ATable
