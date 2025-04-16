import React from 'react';
import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';
import Loader from '../loader/loader';

const ReusableDataTable = ({
  columns,
  data,
  loading,
  rowsPerPage,
  currentPage,
  onChangePage,
  onRowClick,
  paginationRowsPerPageOptions,
  loadingMessage = 'Loading data...',
  noDataMessage = 'No data available',
  striped = true,
  highlightOnHover = true,
  noHeader = true,
}) => {
  // Ensure unique key for re-rendering when rowsPerPage changes
  const tableKey = `datatable-${rowsPerPage}`;

  return (
    <div className="relative">
      <DataTable
        key={tableKey}
        columns={columns}
        data={data}
        progressPending={loading}
        progressComponent={<Loader message={loadingMessage} />}
        noDataComponent={<Loader message={noDataMessage} />}
        pagination
        paginationPerPage={rowsPerPage}
        paginationRowsPerPageOptions={paginationRowsPerPageOptions || [5, 10, 20, rowsPerPage].sort((a, b) => a - b)}
        paginationDefaultPage={currentPage}
        onChangePage={onChangePage}
        onRowClicked={onRowClick}
        highlightOnHover={highlightOnHover}
        striped={striped}
        noHeader={noHeader}
        className="relative"
      />
    </div>
  );
};

ReusableDataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onRowClick: PropTypes.func,
  paginationRowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  loadingMessage: PropTypes.string,
  noDataMessage: PropTypes.string,
  striped: PropTypes.bool,
  highlightOnHover: PropTypes.bool,
  noHeader: PropTypes.bool,
};

ReusableDataTable.defaultProps = {
  striped: true,
  highlightOnHover: true,
  noHeader: true,
  loadingMessage: 'Loading data...',
  noDataMessage: 'No data available',
};

export default ReusableDataTable;