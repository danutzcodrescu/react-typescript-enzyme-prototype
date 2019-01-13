import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import isNil from 'lodash/isNil';

interface TableData {
  id: string;
  [key: string]: string | number;
}

interface Props<T> {
  tableProps: string[];
  data: any[];
  page: number;
  count: number;
  rowsPerPage?: number;
  onChangePage: (page: number) => void;
  onRowClick?: (id: string) => void;
}

export class TableComponent<T> extends React.Component<Props<T>> {
  static defaultProps = {
    rowsPerPage: 10
  };
  render() {
    const { props } = this;
    return (
      <Table>
        <TableHead>
          <TableRow>
            {props.tableProps.map(header => (
              <TableCell key={header}>
                {header.substring(0, 1).toUpperCase() + header.slice(1)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map(row => {
            return (
              <TableRow
                key={row.id}
                hover={true}
                onClick={() =>
                  !isNil(props.onRowClick) ? props.onRowClick(row.id) : false
                }
              >
                {props.tableProps.map(prop => (
                  <TableCell key={prop + row.id}>
                    {typeof row[prop] === 'number'
                      ? row[prop].toLocaleString()
                      : row[prop]}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[props.rowsPerPage!]}
              count={props.count}
              rowsPerPage={props.rowsPerPage!}
              page={props.page - 1}
              onChangePage={(_, page) => props.onChangePage(page)}
            />
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
}
