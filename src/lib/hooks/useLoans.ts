// TODO: refactor
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SortDirection, SortField } from '@/lib/types';
import { ILoanData } from '@/lib/interfaces';
import { MOCK_DATA } from '../mocks';

const BASE = import.meta.env.VITE_BASE_URL;

export const useLoans = () => {
  const [loans, setLoans] = useState<ILoanData[]>();
  const [loanTypeDisplay, setLoanTypeDisplay] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [currentLoans, setCurrentLoans] = useState<ILoanData[]>([]);

  const handleLoanTypeDisplayChange = (type: string) => {
    setLoanTypeDisplay(type);
    setCurrentPage(1);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // If clicking the same field, toggle direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // If clicking a different field, set new field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
    // Reset to first page when sorting changes
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number.parseInt(value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    // setLoans(MOCK_DATA); // * for testing purposes

    const fetchLoans = async () => {
      try {
        const response = await axios.get(`${BASE}/loans`);
        const responseData = await response.data;
        setLoans(responseData.data);
      } catch (error) {
        console.error('Error fetching loans:', error);
      }
    };

    fetchLoans();
  }, []);

  useEffect(() => {
    if (!loans) return;

    const filteredData = loans.filter((item) => {
      if (loanTypeDisplay === 'All') return true;
      return item.status === loanTypeDisplay;
    });

    // Sort the filtered data
    const sortedData = [...filteredData].sort((a, b) => {
      if (!sortField) return 0;

      let aValue: string | number;
      let bValue: string | number;

      if (sortField === 'name') {
        aValue = a.applicantname.toLowerCase();
        bValue = b.applicantname.toLowerCase();
      } else if (sortField === 'amount') {
        aValue = a.requestedamount;
        bValue = b.requestedamount;
      } else {
        return 0;
      }

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    // Calculate pagination
    const totalItems = sortedData.length;
    setTotalItems(totalItems);

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    setTotalPages(totalPages);

    const startIndex = (currentPage - 1) * itemsPerPage;
    setStartIndex(startIndex);

    const endIndex = startIndex + itemsPerPage;
    setEndIndex(endIndex);

    const currentData = sortedData.slice(startIndex, endIndex);
    setCurrentLoans(currentData);
  }, [currentPage, itemsPerPage, loans, loanTypeDisplay, sortDirection, sortField]);

  return {
    allLoans: loans,
    currentLoans,
    currentPage,
    itemsPerPage,
    loanTypeDisplay,
    totalItems,
    totalPages,
    startIndex,
    endIndex,
    sortDirection,
    sortField,
    handleItemsPerPageChange,
    handleLoanTypeDisplayChange,
    handlePageChange,
    handlePreviousPage,
    handleNextPage,
    handleSort,
  };
};
