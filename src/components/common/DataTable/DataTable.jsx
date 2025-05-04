// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import DataTable, { createTheme } from 'react-data-table-component';
// import Loader from '../loader/loader';

// const ReusableDataTable = ({
//   columns,
//   data,
//   loading,
//   rowsPerPage,
//   currentPage,
//   onChangePage,
//   onRowClick,
//   paginationRowsPerPageOptions,
//   loadingMessage = 'Loading data...',
//   noDataMessage = 'No data available',
//   striped = true,
//   highlightOnHover = true,
//   noHeader = true,
// }) => {
//   // Ensure unique key for re-rendering when rowsPerPage changes
//   const tableKey = `datatable-${rowsPerPage}`;

//   // Create custom dark theme (non-greenish aesthetic)
//   createTheme('customDark', {
//     text: {
//       primary: '#60a5fa', // Soft sky blue
//       secondary: '#a3bffa', // Light lavender blue
//     },
//     background: {
//       default: '#1e293b', // Deep slate gray (matches sidebar/nav)
//     },
//     context: {
//       background: '#3b82f6', // Vibrant blue
//       text: '#ffffff',
//     },
//     divider: {
//       default: '#4b5563', // Medium gray
//     },
//     action: {
//       button: 'rgba(96, 165, 250, 0.54)', // Soft sky blue with opacity
//       hover: 'rgba(59, 130, 246, 0.1)', // Vibrant blue with low opacity
//       disabled: 'rgba(75, 85, 99, 0.3)', // Medium gray with opacity
//     },
//   }, 'dark');

//   // Detect browser theme preference
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   useEffect(() => {
//     const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
//     setIsDarkMode(mediaQuery.matches);
//     const handleChange = (e) => setIsDarkMode(e.matches);
//     mediaQuery.addEventListener('change', handleChange);
//     return () => mediaQuery.removeEventListener('change', handleChange);
//   }, []);

//   // Custom styles with theme-aware CSS variables
//   const customStyles = {
//     table: {
//       style: {
//         backgroundColor: 'var(--table-bg, #ffffff)',
//       },
//     },
//     tableWrapper: {
//       style: {
//         backgroundColor: 'var(--table-bg, #ffffff)',
//       },
//     },
//     headCells: {
//       style: {
//         backgroundColor: 'var(--header-bg, #f9fafb)',
//         color: 'var(--header-text, #111827)',
//         fontWeight: '600',
//       },
//     },
//     cells: {
//       style: {
//         color: 'var(--cell-text, #111827)',
//       },
//     },
//     rows: {
//       style: {
//         backgroundColor: 'var(--row-bg, #ffffff)',
//         '&:hover': {
//           backgroundColor: 'var(--row-hover-bg, #f3f4f6)',
//         },
//       },
//       stripedStyle: {
//         backgroundColor: 'var(--row-striped-bg, #f9fafb)',
//       },
//     },
//     pagination: {
//       style: {
//         backgroundColor: 'var(--pagination-bg, #ffffff)',
//         color: 'var(--pagination-text, #111827)',
//       },
//     },
//   };

//   return (
//     <div
//       className="relative"
//       style={{
//         '--table-bg': isDarkMode ? '#1e293b' : 'white',
//         '--header-bg': isDarkMode ? '#2d3748' : '#f9fafb',
//         '--header-text': isDarkMode ? '#60a5fa' : '#111827',
//         '--cell-text': isDarkMode ? '#a3bffa' : '#111827',
//         '--row-bg': isDarkMode ? '#1e293b' : 'white',
//         '--row-hover-bg': isDarkMode ? '#3b82f6' : '#f3f4f6',
//         '--row-striped-bg': isDarkMode ? '#2d3748' : '#f9fafb',
//         '--pagination-bg': isDarkMode ? '#1e293b' : 'white',
//         '--pagination-text': isDarkMode ? '#60a5fa' : '#111827',
//       }}
//     >
//       <DataTable
//         key={tableKey}
//         columns={columns}
//         data={data}
//         progressPending={loading}
//         progressComponent={<Loader message={loadingMessage} />}
//         noDataComponent={<Loader message={noDataMessage} />}
//         pagination
//         paginationPerPage={rowsPerPage}
//         paginationRowsPerPageOptions={
//           paginationRowsPerPageOptions || [5, 10, 20, rowsPerPage].sort((a, b) => a - b)
//         }
//         paginationDefaultPage={currentPage}
//         onChangePage={onChangePage}
//         onRowClicked={onRowClick}
//         highlightOnHover={highlightOnHover}
//         striped={striped}
//         noHeader={noHeader}
//         className="relative"
//         customStyles={customStyles}
//         theme={isDarkMode ? 'customDark' : 'default'}
//       />
//     </div>
//   );
// };

// ReusableDataTable.propTypes = {
//   columns: PropTypes.array.isRequired,
//   data: PropTypes.array.isRequired,
//   loading: PropTypes.bool.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
//   currentPage: PropTypes.number.isRequired,
//   onChangePage: PropTypes.func.isRequired,
//   onRowClick: PropTypes.func,
//   paginationRowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
//   loadingMessage: PropTypes.string,
//   noDataMessage: PropTypes.string,
//   striped: PropTypes.bool,
//   highlightOnHover: PropTypes.bool,
//   noHeader: PropTypes.bool,
// };

// ReusableDataTable.defaultProps = {
//   striped: true,
//   highlightOnHover: true,
//   noHeader: true,
//   loadingMessage: 'Loading data...',
//   noDataMessage: 'No data available',
// };

// export default ReusableDataTable;


// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import DataTable, { createTheme } from 'react-data-table-component';
// import Loader from '../loader/loader';

// const ReusableDataTable = ({
//   columns,
//   data,
//   loading,
//   rowsPerPage,
//   currentPage,
//   onChangePage,
//   onRowClick,
//   paginationRowsPerPageOptions,
//   loadingMessage = 'Loading data...',
//   noDataMessage = 'No data available',
//   striped = true,
//   highlightOnHover = true,
//   noHeader = true,
// }) => {
//   // Ensure unique key for re-rendering when rowsPerPage changes
//   const tableKey = `datatable-${rowsPerPage}`;

//   // Create custom dark theme
//   createTheme('customDark', {
//     text: {
//       primary: '#D1D5DB', // gray-300 (matches app's light text in dark mode)
//       secondary: '#9CA3AF', // gray-400 (secondary text)
//     },
//     background: {
//       default: '#1F2937', // gray-800 (matches dark background)
//     },
//     context: {
//       background: '#3B82F6', // blue-500 (consistent with app's vibrant blue)
//       text: '#FFFFFF',
//     },
//     divider: {
//       default: '#4B5563', // gray-600 (consistent with app dividers)
//     },
//     action: {
//       button: 'rgba(59, 130, 246, 0.54)', // blue-500 with opacity
//       hover: 'rgba(59, 130, 246, 0.1)', // blue-500 hover
//       disabled: 'rgba(75, 85, 99, 0.3)', // gray-600 disabled
//     },
//   }, 'dark');

//   // Detect application theme based on 'dark' class
//   const [isDarkMode, setIsDarkMode] = useState(
//     document.documentElement.classList.contains('dark')
//   );

//   // Sync with theme changes
//   useEffect(() => {
//     const checkTheme = () => {
//       const dark = document.documentElement.classList.contains('dark');
//       setIsDarkMode(dark);
//     };

//     // Initial check
//     checkTheme();

//     // Listen for storage events (cross-tab sync)
//     window.addEventListener('storage', checkTheme);

//     // Optional: Poll for theme changes (in case storage event misses)
//     const interval = setInterval(checkTheme, 100);

//     return () => {
//       window.removeEventListener('storage', checkTheme);
//       clearInterval(interval);
//     };
//   }, []);

//   // Custom styles with theme-aware CSS variables
//   const customStyles = {
//     table: {
//       style: {
//         backgroundColor: 'var(--table-bg)',
//       },
//     },
//     tableWrapper: {
//       style: {
//         backgroundColor: 'var(--table-bg)',
//       },
//     },
//     headCells: {
//       style: {
//         backgroundColor: 'var(--header-bg)',
//         color: 'var(--header-text)',
//         fontWeight: '600',
//       },
//     },
//     cells: {
//       style: {
//         color: 'var(--cell-text)',
//       },
//     },
//     rows: {
//       style: {
//         backgroundColor: 'var(--row-bg)',
//         '&:hover': {
//           backgroundColor: 'var(--row-hover-bg)',
//         },
//       },
//       stripedStyle: {
//         backgroundColor: 'var(--row-striped-bg)',
//       },
//     },
//     pagination: {
//       style: {
//         backgroundColor: 'var(--pagination-bg)',
//         color: 'var(--pagination-text)',
//       },
//     },
//   };

//   return (
//     <div
//       className="relative"
//       style={{
//         '--table-bg': isDarkMode ? '#1F2937' : '#FFFFFF', // gray-800 / white
//         '--header-bg': isDarkMode ? '#374151' : '#F9FAFB', // gray-700 / gray-50
//         '--header-text': isDarkMode ? '#D1D5DB' : '#111827', // gray-300 / gray-900
//         '--cell-text': isDarkMode ? '#D1D5DB' : '#111827', // gray-300 / gray-900
//         '--row-bg': isDarkMode ? '#1F2937' : '#FFFFFF', // gray-800 / white
//         '--row-hover-bg': isDarkMode ? '#4B5563' : '#F3F4F6', // gray-600 / gray-100
//         '--row-striped-bg': isDarkMode ? '#374151' : '#F9FAFB', // gray-700 / gray-50
//         '--pagination-bg': isDarkMode ? '#1F2937' : '#FFFFFF', // gray-800 / white
//         '--pagination-text': isDarkMode ? '#D1D5DB' : '#111827', // gray-300 / gray-900
//       }}
//     >
//       <DataTable
//         key={tableKey}
//         columns={columns}
//         data={data}
//         progressPending={loading}
//         progressComponent={<Loader message={loadingMessage} />}
//         noDataComponent={<Loader message={noDataMessage} />}
//         pagination
//         paginationPerPage={rowsPerPage}
//         paginationRowsPerPageOptions={
//           paginationRowsPerPageOptions || [5, 10, 20, rowsPerPage].sort((a, b) => a - b)
//         }
//         paginationDefaultPage={currentPage}
//         onChangePage={onChangePage}
//         onRowClicked={onRowClick}
//         highlightOnHover={highlightOnHover}
//         striped={striped}
//         noHeader={noHeader}
//         className="relative"
//         customStyles={customStyles}
//         theme={isDarkMode ? 'customDark' : 'default'}
//       />
//     </div>
//   );
// };

// ReusableDataTable.propTypes = {
//   columns: PropTypes.array.isRequired,
//   data: PropTypes.array.isRequired,
//   loading: PropTypes.bool.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
//   currentPage: PropTypes.number.isRequired,
//   onChangePage: PropTypes.func.isRequired,
//   onRowClick: PropTypes.func,
//   paginationRowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
//   loadingMessage: PropTypes.string,
//   noDataMessage: PropTypes.string,
//   striped: PropTypes.bool,
//   highlightOnHover: PropTypes.bool,
//   noHeader: PropTypes.bool,
// };

// ReusableDataTable.defaultProps = {
//   striped: true,
//   highlightOnHover: true,
//   noHeader: true,
//   loadingMessage: 'Loading data...',
//   noDataMessage: 'No data available',
// };

// export default ReusableDataTable;



import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DataTable, { createTheme } from 'react-data-table-component';
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

  // Create custom dark theme
  createTheme('customDark', {
    text: {
      primary: '#D1D5DB', // gray-300 (matches app's light text in dark mode)
      secondary: '#9CA3AF', // gray-400 (secondary text)
    },
    background: {
      default: '#1F2937', // gray-800 (matches dark background)
    },
    context: {
      background: '#3B82F6', // blue-500 (consistent with app's vibrant blue)
      text: '#FFFFFF',
    },
    divider: {
      default: '#4B5563', // gray-600 (consistent with app dividers)
    },
    action: {
      button: 'rgba(59, 130, 246, 0.54)', // blue-500 with opacity
      hover: 'rgba(59, 130, 246, 0.1)', // blue-500 hover
      disabled: 'rgba(75, 85, 99, 0.3)', // gray-600 disabled
    },
  }, 'dark');

  // Detect application theme based on 'dark' class
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains('dark')
  );

  // Sync with theme changes
  useEffect(() => {
    const checkTheme = () => {
      const dark = document.documentElement.classList.contains('dark');
      setIsDarkMode(dark);
    };

    // Initial check
    checkTheme();

    // Listen for storage events (cross-tab sync)
    window.addEventListener('storage', checkTheme);

    // Optional: Poll for theme changes (in case storage event misses)
    const interval = setInterval(checkTheme, 100);

    return () => {
      window.removeEventListener('storage', checkTheme);
      clearInterval(interval);
    };
  }, []);

  // Custom styles with theme-aware CSS variables
  const customStyles = {
    table: {
      style: {
        backgroundColor: 'var(--table-bg)',
      },
    },
    tableWrapper: {
      style: {
        backgroundColor: 'var(--table-bg)',
      },
    },
    headCells: {
      style: {
        backgroundColor: 'var(--header-bg)',
        color: 'var(--header-text)',
        fontWeight: '600',
      },
    },
    cells: {
      style: {
        color: 'var(--cell-text)',
      },
    },
    rows: {
      style: {
        backgroundColor: 'var(--row-bg)',
        '&:hover': {
          backgroundColor: 'var(--row-hover-bg)',
        },
      },
      stripedStyle: {
        backgroundColor: 'var(--row-striped-bg)',
      },
    },
    pagination: {
      style: {
        backgroundColor: 'var(--pagination-bg)',
        color: 'var(--pagination-text)',
      },
    },
  };

  return (
    <div
      className="relative"
      style={{
        '--table-bg': isDarkMode ? '#1F2937' : '#FFFFFF', // gray-800 / white
        '--header-bg': isDarkMode ? '#374151' : '#F9FAFB', // gray-700 / gray-50
        '--header-text': isDarkMode ? '#D1D5DB' : '#111827', // gray-300 / gray-900
        '--cell-text': isDarkMode ? '#D1D5DB' : '#111827', // gray-300 / gray-900
        '--row-bg': isDarkMode ? '#1F2937' : '#FFFFFF', // gray-800 / white
        '--row-hover-bg': isDarkMode ? '#4B5563' : '#F3F4F6', // gray-600 / gray-100
        '--row-striped-bg': isDarkMode ? '#374151' : '#F9FAFB', // gray-700 / gray-50
        '--pagination-bg': isDarkMode ? '#1F2937' : '#FFFFFF', // gray-800 / white
        '--pagination-text': isDarkMode ? '#D1D5DB' : '#111827', // gray-300 / gray-900
      }}
    >
      <DataTable
        key={tableKey}
        columns={columns}
        data={data}
        progressPending={loading}
        progressComponent={<Loader message={loadingMessage} />}
        noDataComponent={<div className="py-4 text-center">{noDataMessage}</div>}
        pagination
        paginationPerPage={rowsPerPage}
        paginationRowsPerPageOptions={
          paginationRowsPerPageOptions || [5, 10, 20, rowsPerPage].sort((a, b) => a - b)
        }
        paginationDefaultPage={currentPage}
        onChangePage={onChangePage}
        onRowClicked={onRowClick}
        highlightOnHover={highlightOnHover}
        striped={striped}
        noHeader={noHeader}
        className="relative"
        customStyles={customStyles}
        theme={isDarkMode ? 'customDark' : 'default'}
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