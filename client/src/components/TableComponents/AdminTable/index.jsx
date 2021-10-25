import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import styles from "./index.module.scss";
import { ReactComponent as ArrowRight } from "../../../assets/icons/arrow_right_black.svg";

import { COLUMNS } from "../Columns";
import GlobalFilter from "../GlobalFilter";

const AdminTable = ({ allPets, handleRowClick }) => {
  const columns = useMemo(() => COLUMNS, []);
  // eslint-disable-next-line
  const data = useMemo(() => allPets, []);

  //Om data inkluderar datumfält och det är formatterat som en string:
  //Titta på React Table Tutorial - 7 - Sorting and Formatting

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
    pageOptions,
    setPageSize,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  /* OM du vill lägga till kolumnfiltrering:
  1. Klistra in detta mellan {colun.render("Header") och <span>} : { <div>{column.canFilter ? column.render('Filter') : null}</div>}
  2. Lägg till useFillters i hooken, ovanför useGlobalFilter :   useFilters,
  3. Importera useFilters från "react-table"
  4. I Columns-componenten, lägg till detta på varje objekt : Filter: ColumnFilter,
  5. I columns-componenten, importera : import ColumnFilter from "../ColumnFilter"
  6. Använd ColumnFilter-mappen.
  7. Läs mer på React Table Tutorial, nr 9 och 10. */

  return (
    <>
      <div className={styles.filteringOptions}>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

        <div className={styles.navigationAndSettings}>
          <div className={styles.navigation}>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              <ArrowRight className={styles.leftArrow}/>
            </button>

            <span className={styles.pageCount}>
              {" "}
              {pageIndex + 1} - {pageOptions.length}
            </span>

            <button onClick={() => nextPage()} disabled={!canNextPage}>
              <ArrowRight />
            </button>
          </div>

          <div className={styles.selectWrapper}>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[1, 2, 10, 20, 30].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize} per page 
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className={styles.tableView}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}

                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " ▲"
                          : " ▼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} onClick={() => handleRowClick(row.original.pet_id)}>
                  {row.cells.map((cell) => {
                    return (
                     <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminTable;
