import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

export const useResponsiveRowsPerPage = ({
  rowHeight = 60,
  navbarHeight = 60,
  controlsHeight = 120,
  extraPadding = 50,
  minRows = 5,
  maxRowsMobile = 5,
  maxRowsTablet = 10,
  maxRowsDesktop = 20,
  debounceDelay = 200,
} = {}) => {
  const [rowsPerPage, setRowsPerPage] = useState(minRows);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate rows per page based on viewport height
  const calculateRowsPerPage = useCallback(() => {
    const viewportHeight = window.innerHeight;
    const availableTableHeight = viewportHeight - (navbarHeight + controlsHeight + extraPadding);
    let calculatedRows = Math.floor(availableTableHeight / rowHeight);

    // Device-specific adjustments
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const isTablet = window.matchMedia("(min-width: 769px) and (max-width: 1024px)").matches;

    if (isMobile) {
      calculatedRows = Math.min(calculatedRows, maxRowsMobile);
    } else if (isTablet) {
      calculatedRows = Math.min(calculatedRows, maxRowsTablet);
    } else {
      calculatedRows = Math.min(calculatedRows, maxRowsDesktop);
    }

    // Ensure minimum rows
    calculatedRows = Math.max(calculatedRows, minRows);

    return calculatedRows;
  }, [
    rowHeight,
    navbarHeight,
    controlsHeight,
    extraPadding,
    minRows,
    maxRowsMobile,
    maxRowsTablet,
    maxRowsDesktop,
  ]);

  // Debounced resize handler
  const debouncedUpdateRows = useCallback(
    debounce(() => {
      const newRows = calculateRowsPerPage();
      setRowsPerPage(newRows);
      setCurrentPage(1); // Reset to page 1 when rows per page changes
    }, debounceDelay),
    [calculateRowsPerPage]
  );

  // Handle mount and resize
  useEffect(() => {
    debouncedUpdateRows();
    window.addEventListener("resize", debouncedUpdateRows);
    return () => {
      window.removeEventListener("resize", debouncedUpdateRows);
      debouncedUpdateRows.cancel(); // Cleanup debounce
    };
  }, [debouncedUpdateRows]);

  return {
    rowsPerPage,
    currentPage,
    setCurrentPage,
    calculateRowsPerPage,
  };
};