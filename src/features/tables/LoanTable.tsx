//TODO: refactor
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';

import LoanAdd from '@/features/modals/LoanAdd';
import LoanEdit from '@/features/modals/LoanEdit';
import ConfirmationDelete from '@/features/modals/ConfirmationDelete';
import { ILoanData } from '@/lib/interfaces';
import { SortDirection, SortField, StatusType } from '@/lib/types';

const getStatusColor = (status: StatusType) => {
  switch (status) {
    case 'APPROVED':
      return 'bg-green-100 text-green-800 hover:bg-green-100';
    case 'PENDING':
      return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    case 'REJECTED':
      return 'bg-red-100 text-red-800 hover:bg-red-100';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
  }
};

interface LoanTableProps {
  loans?: ILoanData[];
}

export default function LoanTable({ loans }: LoanTableProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ILoanData | null>(null);
  const [deletingItem, setDeletingItem] = useState<ILoanData | null>(null);

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

  const tabs = ['All', 'APPROVED', 'REJECTED', 'PENDING'];
  const itemsPerPageOptions = [5, 10, 15];

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />;
  };

  const handleAddNew = () => {
    setIsAddModalOpen(true);
  };

  const handleEdit = (item: ILoanData) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  const handleDelete = (item: ILoanData) => {
    setDeletingItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingItem) {
      // Handle delete logic here
      console.log('Deleting item:', deletingItem);
      setDeletingItem(null);
    }
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingItem(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingItem(null);
  };

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

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

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
  }, [currentPage, itemsPerPage, loanTypeDisplay, loans, sortDirection, sortField]);

  return (
    <div className="w-full space-y-2 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Loans</h1>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Loan
        </Button>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={loanTypeDisplay === tab ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleLoanTypeDisplayChange(tab)}
              className={loanTypeDisplay === tab ? 'bg-blue-50 text-blue-600 hover:bg-blue-50' : 'text-gray-600 hover:text-gray-900'}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Items per page selector */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Show:</span>
          <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {itemsPerPageOptions.map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-700">per page</span>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border mt-2">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              {/* <TableHead>ID</TableHead> */}
              <TableHead>
                <button onClick={() => handleSort('name')} className="flex items-center hover:text-gray-900 font-medium">
                  Name
                  {getSortIcon('name')}
                </button>
              </TableHead>
              <TableHead>
                <button onClick={() => handleSort('amount')} className="flex items-center hover:text-gray-900 font-medium">
                  Amount
                  {getSortIcon('amount')}
                </button>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentLoans.map((item, index) => (
              <TableRow key={`${item.id}-${index}`} className="hover:bg-gray-50">
                {/* <TableCell className="font-medium">{item.id}</TableCell> */}
                <TableCell>{item.applicantname}</TableCell>
                <TableCell className="font-medium">${item.requestedamount.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(item)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-700">
          Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} results
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {getPageNumbers().map((page, index) => (
            <Button
              key={index}
              variant={currentPage === page ? 'default' : 'outline'}
              size="sm"
              onClick={() => typeof page === 'number' && handlePageChange(page)}
              className={currentPage === page ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
              disabled={page === '...'}
            >
              {page}
            </Button>
          ))}
          <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Add Loan Modal */}
      <LoanAdd isOpen={isAddModalOpen} onClose={handleCloseAddModal} mode="add" />

      {/* Edit Loan Modal */}
      {editingItem && (
        <LoanEdit
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          initialData={{
            name: editingItem.applicantname,
            amount: editingItem.requestedamount.toString(),
            status: editingItem.status,
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingItem && (
        <ConfirmationDelete
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          itemName={deletingItem.applicantname}
        />
      )}
    </div>
  );
}
